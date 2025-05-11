import Papa from "papaparse";

export interface Project {
  name: string;
  shorthand: string;
  credits: { credit: string; person: string }[];
  year: string;
  mediaPath: string;
  visible: boolean;
  category: string;
  blurb: string;
  tags: string[];
  mediaAspect: string;
  linkFeature: boolean;
  link: string;
}

export async function parseProjects(): Promise<Project[]> {
  try {
    const response = await fetch("/vite-react-test/gj_projects.csv");
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const projects = results.data
            .map((row: any) => ({
              name: row.name || "",
              shorthand: row.shorthand || "",
              credits: (row.credits || "")
                .split(";")
                .map((credit: string) => {
                  const [creditText, person] = credit
                    .trim()
                    .split(",")
                    .map((s) => s.trim());
                  return { credit: creditText || "", person: person || "" };
                })
                .filter(
                  (c: { credit: string; person: string }) =>
                    c.credit && c.person
                ),
              year: row.year || "",
              mediaPath: row.media_path || "",
              visible: row.visible === "TRUE",
              category: row.category || "",
              blurb: row.blurb || "",
              tags: row.tags
                ? row.tags.split(",").map((tag: string) => tag.trim())
                : [],
              mediaAspect: row.media_aspect || "",
              linkFeature: row.link_feature === "TRUE",
              link: row.link || "",
            }))
            .filter((project) => project.visible);
          resolve(projects);
        },
        error: (error: Error) => reject(error),
      });
    });
  } catch (error) {
    console.error("Error parsing projects:", error);
    return [];
  }
}
