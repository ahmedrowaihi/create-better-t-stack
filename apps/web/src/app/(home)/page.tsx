"use client";
import ShinyText from "@/app/(home)/_components/ShinyText";
import React from "react";
import CodeContainer from "./_components/CodeContainer";
import CustomizableSection from "./_components/CustomizableSection";
import NpmPackage from "./_components/NpmPackage";
// import Testimonials from "./_components/Testimonials";

export default function HomePage() {
	return (
		<main className="flex flex-col items-center justify-start sm:p-8 p-4 !pt-40 dark:bg-gray-950 bg-gray-50 transition-colors duration-300">
			<div className="max-w-6xl mx-auto text-center mb-16 relative z-50 ">
				<div className="relative z-10">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<h1 className="text-6xl font-extrabold dark:text-white text-gray-900">
							<span className="block sm:text-7xl text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
								Better-T Stack
							</span>
							<span className="relative">
								<span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100" />
							</span>
						</h1>
						<NpmPackage />

						<p className="sm:text-2xl text-xl font-medium dark:text-gray-300 text-gray-700 max-w-2xl">
							<span className="inline-block transform hover:scale-105 transition-transform duration-200">
								Scaffold
							</span>{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
								production-ready
							</span>{" "}
							<span className="inline-block transition-transform duration-200">
								Better-T projects in seconds
							</span>
						</p>
						<CodeContainer />
						<ShinyText
							text="Be the safest developer with typesafe Typescript"
							speed={3}
							className="sm:text-lg text-md text-gray-600 dark:text-[#b5b5b5a4]"
						/>
					</div>
				</div>
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-gradient-to-r dark:from-purple-500/20 dark:to-indigo-500/20 from-blue-300/20 to-indigo-300/20 dark:blur-3xl blur-2xl transform -skew-y-12" />
				</div>
			</div>
			<CustomizableSection />
			<div className="w-full pt-16 relative overflow-hidden">
				<div className="max-w-6xl mx-auto relative">
					<div className="flex items-center justify-center">
						<div className="hidden sm:flex items-center w-1/3">
							<div className="h-px flex-grow bg-gradient-to-r from-transparent to-blue-500/70" />
							<div className="h-8 w-8 rounded-full dark:bg-gray-900 bg-gray-100 dark:border-gray-700 border-gray-300 flex items-center justify-center relative">
								<div
									className="h-2 w-2 bg-blue-400 rounded-full animate-ping absolute"
									style={{ animationDuration: "2.5s" }}
								/>
							</div>
						</div>

						<div className="relative flex flex-col items-center justify-center px-6 z-10">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl -z-10" />
						</div>

						<div className="hidden sm:flex items-center w-1/3">
							<div className="h-8 w-8 rounded-full dark:bg-gray-900 bg-gray-100 dark:border-gray-700 border-gray-300 flex items-center justify-center relative">
								<div
									className="h-2 w-2 bg-indigo-400 rounded-full animate-ping absolute"
									style={{ animationDuration: "2.5s" }}
								/>
							</div>
							<div className="h-px flex-grow bg-gradient-to-l from-transparent to-indigo-500/70" />
						</div>
					</div>

					<div className="sm:hidden h-px w-full mt-4 bg-gradient-to-r from-blue-500/30 via-indigo-500 to-blue-500/30" />

					<div className="absolute -top-10 left-1/4 text-6xl dark:text-gray-800/10 text-gray-300/20 font-mono transform rotate-12">
						{"{"}
					</div>
					<div className="absolute -bottom-10 right-1/4 text-6xl dark:text-gray-800/10 text-gray-300/20 font-mono transform -rotate-12">
						{"}"}
					</div>
				</div>
			</div>
			{/* <Testimonials /> */}
		</main>
	);
}
