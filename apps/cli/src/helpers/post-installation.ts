import { log } from "@clack/prompts";
import pc from "picocolors";
import type {
	PackageManager,
	ProjectAddons,
	ProjectDatabase,
	ProjectFrontend,
	ProjectOrm,
	Runtime,
} from "../types";

export function displayPostInstallInstructions(
	database: ProjectDatabase,
	projectName: string,
	packageManager: PackageManager,
	depsInstalled: boolean,
	orm: ProjectOrm,
	addons: ProjectAddons[],
	runtime: Runtime,
	frontends: ProjectFrontend[],
) {
	const runCmd = packageManager === "npm" ? "npm run" : packageManager;
	const cdCmd = `cd ${projectName}`;
	const hasHuskyOrBiome =
		addons?.includes("husky") || addons?.includes("biome");

	const databaseInstructions =
		database !== "none"
			? getDatabaseInstructions(database, orm, runCmd, runtime)
			: "";
	const tauriInstructions = addons?.includes("tauri")
		? getTauriInstructions(runCmd)
		: "";
	const lintingInstructions = hasHuskyOrBiome
		? getLintingInstructions(runCmd)
		: "";
	const nativeInstructions = frontends?.includes("native")
		? getNativeInstructions()
		: "";

	const hasWebFrontend = frontends?.includes("web");
	const hasNativeFrontend = frontends?.includes("native");
	const hasFrontend = hasWebFrontend || hasNativeFrontend;

	log.info(`${pc.bold("Next steps:")}
${pc.cyan("1.")} ${cdCmd}
${!depsInstalled ? `${pc.cyan("2.")} ${packageManager} install\n` : ""}${pc.cyan(depsInstalled ? "2." : "3.")} ${runCmd} dev

${pc.bold("Your project will be available at:")}
${
	hasFrontend
		? `${hasWebFrontend ? `${pc.cyan("•")} Frontend: http://localhost:3001\n` : ""}`
		: `${pc.yellow("NOTE:")} You are creating a backend-only app (no frontend selected)\n`
}${pc.cyan("•")} API: http://localhost:3000
${nativeInstructions ? `\n${nativeInstructions.trim()}` : ""}${databaseInstructions ? `\n${databaseInstructions.trim()}` : ""}${tauriInstructions ? `\n${tauriInstructions.trim()}` : ""}${lintingInstructions ? `\n${lintingInstructions.trim()}` : ""}`);
}

function getNativeInstructions(): string {
	return `${pc.yellow("NOTE:")} If the Expo app cannot connect to the server, update the EXPO_PUBLIC_SERVER_URL in apps/native/.env to use your local IP address instead of localhost:\n${pc.dim("EXPO_PUBLIC_SERVER_URL=http://192.168.0.103:3000")}\n`;
}

function getLintingInstructions(runCmd?: string): string {
	return `${pc.bold("Linting and formatting:")}\n${pc.cyan("•")} Format and lint fix: ${pc.dim(`${runCmd} check`)}\n\n`;
}

function getDatabaseInstructions(
	database: ProjectDatabase,
	orm?: ProjectOrm,
	runCmd?: string,
	runtime?: Runtime,
): string {
	const instructions = [];

	if (orm === "prisma") {
		if (database === "sqlite") {
			instructions.push(
				`${pc.yellow("NOTE:")} Turso support with Prisma is in Early Access and requires additional setup.`,
				`${pc.dim("Learn more at: https://www.prisma.io/docs/orm/overview/databases/turso")}`,
			);
		}

		if (runtime === "bun") {
			instructions.push(
				`${pc.yellow("NOTE:")} Prisma with Bun may require additional configuration. If you encounter errors, follow the guidance provided in the error messages`,
			);
		}

		instructions.push(
			`${pc.cyan("•")} Apply schema: ${pc.dim(`${runCmd} db:push`)}`,
		);
		instructions.push(
			`${pc.cyan("•")} Database UI: ${pc.dim(`${runCmd} db:studio`)}`,
		);
	} else if (orm === "drizzle") {
		if (database === "sqlite") {
			instructions.push(
				`${pc.cyan("•")} Start local DB: ${pc.dim(`cd apps/server && ${runCmd} db:local`)}`,
			);
		}
		instructions.push(
			`${pc.cyan("•")} Apply schema: ${pc.dim(`${runCmd} db:push`)}`,
		);
		instructions.push(
			`${pc.cyan("•")} Database UI: ${pc.dim(`${runCmd} db:studio`)}`,
		);
	}

	return instructions.length
		? `${pc.bold("Database commands:")}\n${instructions.join("\n")}\n\n`
		: "";
}

function getTauriInstructions(runCmd?: string): string {
	return `${pc.bold("Desktop app with Tauri:")}\n${pc.cyan("•")} Start desktop app: ${pc.dim(`cd apps/web && ${runCmd} desktop:dev`)}\n${pc.cyan("•")} Build desktop app: ${pc.dim(`cd apps/web && ${runCmd} desktop:build`)}\n${pc.yellow("NOTE:")} Tauri requires Rust and platform-specific dependencies. See: ${pc.dim("https://v2.tauri.app/start/prerequisites/")}\n\n`;
}
