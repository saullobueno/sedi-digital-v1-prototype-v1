/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	important: true, // melhor que true (escopa no container)
	theme: { extend: {} },
	plugins: [],
	// Se quiser manter o reset do antd, pode deixar o preflight ativo (padrão)
	corePlugins: { preflight: false }, // deixe comentado por enquanto
};
