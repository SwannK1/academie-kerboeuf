import { chromium } from "@playwright/test";

const baseUrl = process.env.ACADEMIE_QA_URL ?? "http://127.0.0.1:3100";
const widths = [320, 375, 390, 768, 1024, 1440];
const routes = [
  "/",
  "/primaire",
  "/primaire/ce1",
  "/primaire/cm2",
  "/primaire/ce1/matieres/francais",
  "/enseignants",
  "/enseignants/mon-annee",
  "/enseignants/ma-semaine",
  "/enseignants/ma-classe",
  "/enseignants/tous-les-outils",
];

const browser = await chromium.launch();
const failures = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "load" });
    const result = await page.evaluate(() => ({
      h1Count: document.querySelectorAll("h1").length,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      overlay: Boolean(
        document.querySelector(
          "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay",
        ),
      ),
    }));

    if (
      response?.status() !== 200 ||
      result.h1Count !== 1 ||
      result.overflow ||
      result.overlay ||
      runtimeErrors.length > 0
    ) {
      failures.push({
        width,
        route,
        status: response?.status(),
        ...result,
        runtimeErrors: [...runtimeErrors],
      });
    }
    runtimeErrors.length = 0;
  }

  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    `QA responsive validée : ${routes.length} pages × ${widths.length} largeurs (${widths.join(", ")} px).`,
  );
}
