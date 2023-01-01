import { portInit } from "./portInit"
import { serverNameInit } from "./serverNameInit"

export const runInits = () => {
	return {
		port: portInit(),
		serverName: serverNameInit()
	}
}