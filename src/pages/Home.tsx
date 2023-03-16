import { Component } from "solid-js";

const Home: Component = () => (
    <section>
        <h4 class="block mb-2 text-gray-400">Timer</h4>
        <div class="max-w-full mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800">
            <div class="flex items-center justify-center pb-6 md:py-0">
                <form class="w-full">
                    <div class="flex flex-col p-1.5 overflow-hidden rounded-lg lg:flex-row">
                        <input
                            class="w-full px-6 py-2 text-gray-700 dark:text-gray-400 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                            type="text"
                            name="description"
                            placeholder="Description"
                            aria-label="Description"
                        />

                        <button class="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                            Start
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
);

export default Home;
