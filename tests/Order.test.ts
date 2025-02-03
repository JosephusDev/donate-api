import { testServer } from './jest.setup'

describe('Order Operations', () => {
	it('should create a new order with valid data', async () => {
		const user_data = await testServer.post('/user/login').send({
			username: 'admin',
			password: 'admin',
		})
		const result = await testServer.post('/order').send({
			donate_location: 'Hospital Geral do Uige',
			urgency: 'alta',
			description: '',
			state: 'pendente',
			user_id: user_data.body.id,
			blood_type_id: 1,
		})
		expect(result.status).toBe(201)
		expect(result.body).toHaveProperty('id')
	})
	it('should return a list of orders', async () => {
		const result = await testServer.get('/order')
		expect(result.status).toBe(200)
	})
})
