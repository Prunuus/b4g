import { Client } from "@notionhq/client";
import { z } from "zod";

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

const examSchema = z.object({
  university: z.string(),
  subject: z.preprocess(
    (arg) => (arg !== undefined ? arg.toString() : ''),
    z.string()
  ),
  course: z.preprocess(
    (arg) => Number(arg),
    z.number()
  ),
  professor: z.string(),
  location: z.string(),
});

async function addToNotionTable(data) {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_PAGE_ID,
    },
    properties: {
      "University": {
        type: "title",
        title: [
          {
            type: "text",
            text: { content: data.university },
          },
        ],
      },
      "Subject": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: { content: data.subject },
          },
        ],
      },
      "Course Number": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: { content: data.course.toString() },
          },
        ],
      },
      "Location": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: { content: data.location },
          },
        ],
      },
      "Professor": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: { content: data.professor },
          },
        ],
      },
    },
  });
  return response;
}

export default async function getUserData(university, subject, course, professor, location) {
  const formData = {
    university,
    subject,
    course,
    professor,
    location,
  };

  try {
    const validatedData = examSchema.parse(formData);
    const notionResponse = await addToNotionTable(validatedData);
    console.log("Notion Response:", notionResponse);
    return notionResponse;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
}
