import { RefineThemes } from "@refinedev/antd";
import locale from 'antd/locale/pt_BR';
import { ConfigProvider, theme } from "antd";
import {
	createContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from "react";

type ColorModeContextType = {
	mode: string;
	setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
	{} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const colorModeFromLocalStorage = localStorage.getItem("colorMode");
	const isSystemPreferenceDark = window?.matchMedia(
		"(prefers-color-scheme: light)"
	).matches;

	const systemPreference = isSystemPreferenceDark ? "dark" : "light";
	const [mode, setMode] = useState("light"
		/* colorModeFromLocalStorage || systemPreference */
	);

	useEffect(() => {
		window.localStorage.setItem("colorMode", mode);
	}, [mode]);

	const setColorMode = () => {
		if (mode === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	};

	const { darkAlgorithm, defaultAlgorithm } = theme;

	return (
		<ColorModeContext.Provider
			value={{
				setMode: setColorMode,
				mode,
			}}
		>
			<ConfigProvider
				// you can change the theme colors here. example: ...RefineThemes.Magenta,
				locale={locale}
				theme={{
					...RefineThemes.Blue,
					algorithm: mode === "dark" ? darkAlgorithm : defaultAlgorithm,
					token: {
						colorLink: '#217346',
						colorPrimary: '#217346',
					},
					components: {
						Layout: {
							headerPadding: "0 12px",
							siderBg: "transparent",
							triggerBg: "transparent",
						},
						Menu: {
							activeBarBorderWidth: '0',
							itemHeight: 24,
							/* fontSize: 16, */
						}
					}
				}}
			>
				{children}
			</ConfigProvider>
		</ColorModeContext.Provider>
	);
};
