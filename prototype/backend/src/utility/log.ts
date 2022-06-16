class Logger {
	public log(...args: any[]): void {
		console.log(this.logPrefix(), '💬', ...args);
	}
	public logHttpRequest(method: string, ...args: any[]): void {
		console.log(this.logPrefix(), method, ...args);
	}

	public debug(...args: any[]): void {
		console.debug(this.logPrefix(), '🔧', ...args);
	}

	public error(...args: any[]): void {
		console.error(this.logPrefix(), '🔥', ...args);
	}

	public warn(...args: any[]): void {
		console.warn(this.logPrefix(), '⚠️ ', ...args);
	}

	public inspect(item: any): void {
		console.log(this.logPrefix(), '👁️');
		console.dir(item);
	}

	public table(arrayLike: any): void {
		console.log(this.logPrefix(), '📋');
		console.table(arrayLike);
	}

	private logPrefix(): string {
		return `[${new Date().toISOString()}]`;
	}
}

export default new Logger();
