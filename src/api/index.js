import { Client } from "@notionhq/client";
import axios from "axios";

const notion = new Client({auth: process.env.NOTION_SECRET_KEY})

//update the notion table
async function addToNotionTable(data) {
    
    const response = await notion.pages.create({
        parent: {
            database_id: process.env.NOTION_PAGE_ID
        },
        properties: {
            "University": {
                "type": "title",
                "title": [{"type": "text", "text":{"content": `${data.univeristy}` }}]
            },
            "Subject": {
                "type": "text",
                "text":`${data.subject}`
            },
            "Course Number": {
                "type": "text",
                "text":`${data.course}`
            },
            "Date": {
                "type": "date",
                "date": { "start": `${data.date}` }
            },
            "Location": {
                "type": "text",
                "text":`${data.location}`
            },
            "Professor": {
                "type": "text",
                "text":`${data.professor}`
            }
        }
    });
    
}

