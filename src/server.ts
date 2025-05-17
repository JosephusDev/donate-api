import app from '.'

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
try {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`)
	})
} catch (error) {
	console.error('Erro ao iniciar o servidor:', error)
	process.exit(1)
}
