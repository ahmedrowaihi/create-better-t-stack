import path from "node:path";
import { cancel, spinner } from "@clack/prompts";
import fs from "fs-extra";
import pc from "picocolors";
import type { ProjectConfig } from "../types";
import { setupAddons } from "./addons-setup";
import { setupAuth } from "./auth-setup";
import { setupBackendDependencies } from "./backend-framework-setup";
import { createReadme } from "./create-readme";
import { setupDatabase } from "./db-setup";
import { setupEnvironmentVariables } from "./env-setup";
import { setupExamples } from "./examples-setup";
import { displayPostInstallInstructions } from "./post-installation";
import { initializeGit, updatePackageConfigurations } from "./project-config";
import { setupRuntime } from "./runtime-setup";
import {
	copyBaseTemplate,
	fixGitignoreFiles,
	setupAuthTemplate,
	setupBackendFramework,
	setupFrontendTemplates,
	setupOrmTemplate,
} from "./template-manager";

export async function createProject(options: ProjectConfig): Promise<string> {
	const s = spinner();
	const projectDir = path.resolve(process.cwd(), options.projectName);

	try {
		await fs.ensureDir(projectDir);

		await copyBaseTemplate(projectDir);
		await setupFrontendTemplates(projectDir, options.frontend);

		await fixGitignoreFiles(projectDir);

		await setupBackendFramework(projectDir, options.backendFramework);
		await setupBackendDependencies(
			projectDir,
			options.backendFramework,
			options.runtime,
		);

		await setupOrmTemplate(
			projectDir,
			options.orm,
			options.database,
			options.auth,
		);

		await setupDatabase(
			projectDir,
			options.database,
			options.orm,
			options.turso ?? options.database === "sqlite",
		);

		await setupAuthTemplate(
			projectDir,
			options.auth,
			options.backendFramework,
			options.orm,
			options.database,
		);
		await setupAuth(projectDir, options.auth);

		await setupRuntime(projectDir, options.runtime, options.backendFramework);

		await setupExamples(
			projectDir,
			options.examples,
			options.orm,
			options.auth,
		);

		await setupEnvironmentVariables(projectDir, options);

		await initializeGit(projectDir, options.git);

		if (options.addons.length > 0) {
			await setupAddons(projectDir, options.addons, options.packageManager);
		}

		await updatePackageConfigurations(projectDir, options);
		await createReadme(projectDir, options);

		displayPostInstallInstructions(
			options.database,
			options.projectName,
			options.packageManager,
			!options.noInstall,
			options.orm,
			options.addons,
			options.runtime,
			options.frontend,
		);

		return projectDir;
	} catch (error) {
		s.message(pc.red("Failed"));
		if (error instanceof Error) {
			cancel(pc.red(`Error during project creation: ${error.message}`));
			process.exit(1);
		}
		throw error;
	}
}
