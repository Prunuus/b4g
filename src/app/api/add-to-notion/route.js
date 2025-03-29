// src/app/api/add-to-notion/route.js

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

export async function POST(request) {
  try {
    const { university, subject, course, professor, location } = await request.json();

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
              text: { content: university },
            },
          ],
        },
        "Subject": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: subject },
            },
          ],
        },
        "Course Number": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: course.toString() },
            },
          ],
        },
        "Professor": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: professor },
            },
          ],
        },
        "Location": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: location },
            },
          ],
        },
      },
    });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error adding to Notion" }), { status: 500 });
  }
}
