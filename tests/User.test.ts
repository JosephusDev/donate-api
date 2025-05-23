import { testServer } from './jest.setup'

describe('User Operations', () => {
	it('should create a new user of type hospital with valid data', async () => {
		const result = await testServer.post('/user').send({
			email: 'admin@admin.com',
			username: 'admin',
			password: 'admin',
			fullname: 'Hospital Municipal',
			state: false,
			user_type: 'hospital',
			address: 'Rua 123, 123',
			phone: null,
			gender: 'outro',
			description: null,
			blood_type_id: null,
		})
		expect(result.status).toBe(201)
		expect(result.body).toHaveProperty('id')
	})
	it('should sign-in with valid data and an existent user', async () => {
		const result = await testServer.post('/user/login').send({
			username: 'admin',
			password: 'admin',
		})
		expect(result.status).toBe(200)
		expect(result.body).toHaveProperty('id')
	})
	it('should return a list of donates', async () => {
		const result = await testServer.get('/user/donates')
		expect(result.status).toBe(200)
	})
})
