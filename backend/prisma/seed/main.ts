import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

function normalizeSymbol(symbol: string) {
	return symbol.replace('USDT', '');
}

const intervalMap: Record<string, string> = {
	'5m': '5м',
	'15m': '15м',
	'30m': '30м',
	'1h': '1ч',
	'2h': '2ч',
	'4h': '4ч',
	'8h': '8ч',
	'1d': '1д',
};

const trainingMap: Record<string, string> = {
	'3m': '3 мес',
	'6m': '6 мес',
	'1y': '1 год',
	'2y': '2 года',
};

function buildModelName(
	symbol: string,
	interval: string,
	trainingPeriod: string
) {
	const cleanSymbol = normalizeSymbol(symbol);
	const intervalLabel = intervalMap[interval] ?? interval;
	const trainingLabel = trainingMap[trainingPeriod] ?? trainingPeriod;

	return `${cleanSymbol} • интервал ${intervalLabel} • обучение ${trainingLabel}`;
}

async function main() {
	const { data } = await axios.get(
		'https://crypto-predict-api-ntw5.onrender.com'
	);

	const models = data.available_models;

	for (const externalName of models) {
		const cleanName = externalName.replace('.keras', '');
		const [symbol, interval, trainingPeriod] = cleanName.split('_');

		const name = buildModelName(symbol, interval, trainingPeriod);

		await prisma.model.upsert({
			where: { externalName },
			update: {
				name,
				symbol,
				interval,
				trainingPeriod,
				externalName,
			},
			create: {
				name,
				symbol,
				interval,
				trainingPeriod,
				externalName,
			},
		});
	}

	console.log(`Seeded ${models.length} models`);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
