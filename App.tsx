import React, { useState, useRef } from 'react'
import { BadgeData, BadgeRole, FontSizes } from './types'
import BadgePreview from './components/BadgePreview'
import { toPng } from 'html-to-image'

const AVAILABLE_FONTS = [
	'Montserrat',
	'Inter',
	'Playfair Display',
	'Oswald',
	'Bebas Neue',
	'Lora',
]

export interface FullDesignData extends BadgeData {
	squareColor: string
	decorationColor: string
	decorationOpacity: number
	textColorMain: string
	textColorMuted: string
	textColorSquare: string
	textColorFooter: string
	textColorSubtitle: string
	textColorCommittee: string
	delegateBadgeBg: string
}

const App: React.FC = () => {
	const [badgeData, setBadgeData] = useState<FullDesignData>({
		// Цвета по умолчанию
		primaryColor: '#ffffff', // Общий фон
		accentColor: '#fbbf24', // Желтый (Заголовок и Кнопка)
		squareColor: '#00000070', // Фон квадрата (IT)
		decorationColor: '#0080ff', // Фигура на фоне
		decorationOpacity: 0.20,
		textColorMain: '#000000', // ИМЯ и СТРАНА
		textColorSubtitle: '#000000', // International Conference
		textColorCommittee: '#000000', // Текст комитета (снизу)
		textColorMuted: '#6b7280',
		textColorSquare: '#ffffff', // Текст внутри квадрата
		textColorFooter: '#ffffff', // Текст внутри кнопки
		delegateBadgeBg: 'rgba(0, 0, 0, 0.45)', // Фон плашки "Official Delegate"

		// Контент
		name: 'KOROLENYA\nARTUR',
		country: 'Director of it\nand Technologies',
		committee: 'CCPCJ2',
		role: BadgeRole.SECRETARIAT,
		roleLabel: '',
		squareCode: 'IT',
		eventTitle: 'MIS MUN',
		eventSubtitle: 'INTERNATIONAL CONFERENCE',
		year: '2026',
		titleFont: 'Montserrat',
		logos: ['', '', ''],
		fontSizes: {
			eventTitle: 36,
			eventSubtitle: 11,
			name: 42,
			roleLabel: 9,
			squareCode: 14,
			country: 17,
			committee: 10,
			footerRole: 17,
		},
	})

	const [exporting, setExporting] = useState(false)
	const fileInputRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	]

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target
		setBadgeData(prev => ({ ...prev, [name]: value }))
	}

	const handleFontSizeChange = (key: keyof FontSizes, value: number) => {
		setBadgeData(prev => ({
			...prev,
			fontSizes: { ...prev.fontSizes, [key]: value },
		}))
	}

	const handleExportPNG = async () => {
		const element = document.getElementById('main-badge-preview')
		if (!element) return
		setExporting(true)
		try {
			await document.fonts.ready
			await new Promise(resolve => setTimeout(resolve, 200))
			const dataUrl = await toPng(element, { quality: 1, pixelRatio: 4 })
			const link = document.createElement('a')
			link.href = dataUrl
			link.download = `mun_badge_${badgeData.name.replace(/\n/g, '_')}.png`
			link.click()
		} catch (error) {
			alert('Ошибка экспорта')
		} finally {
			setExporting(false)
		}
	}

	return (
		<div className='min-h-screen flex flex-col lg:flex-row bg-[#f1f5f9]'>
			<aside className='lg:w-[450px] w-full bg-white border-r border-slate-200 p-6 flex flex-col gap-6 h-screen overflow-y-auto sticky top-0 shadow-xl z-30'>
				<div className='flex items-center gap-3 mb-2'>
					<div className='w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl'>
						M
					</div>
					<h1 className='text-lg font-black tracking-tighter text-slate-900 uppercase'>
						MUN Designer
					</h1>
				</div>

				<div className='space-y-6'>
					<section className='bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Настройка Цветов
						</h3>
						<div className='grid grid-cols-2 gap-4'>
							<ColorInput
								label='Фон бейджа'
								name='primaryColor'
								value={badgeData.primaryColor}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Акцент (Заголовок)'
								name='accentColor'
								value={badgeData.accentColor}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Цвет ИМЕНИ'
								name='textColorMain'
								value={badgeData.textColorMain}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Цвет подзаголовка'
								name='textColorSubtitle'
								value={badgeData.textColorSubtitle}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Фон квадрата'
								name='squareColor'
								value={badgeData.squareColor}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Текст в квадрате'
								name='textColorSquare'
								value={badgeData.textColorSquare}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Текст в кнопке'
								name='textColorFooter'
								value={badgeData.textColorFooter}
								onChange={handleInputChange}
							/>
							<ColorInput
								label='Цвет комитета'
								name='textColorCommittee'
								value={badgeData.textColorCommittee}
								onChange={handleInputChange}
							/>
						</div>
						<div className='pt-2'>
							<label className='text-[9px] font-bold text-slate-500 uppercase block mb-1'>
								Прозрачность декора (
								{Math.round(badgeData.decorationOpacity * 100)}%)
							</label>
							<input
								type='range'
								min='0'
								max='1'
								step='0.01'
								name='decorationOpacity'
								value={badgeData.decorationOpacity}
								onChange={handleInputChange}
								className='w-full accent-slate-900'
							/>
						</div>
					</section>

					<section className='bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Текст
						</h3>
						<div className='space-y-3'>
							<input
								name='eventTitle'
								placeholder='MIS MUN'
								value={badgeData.eventTitle}
								onChange={handleInputChange}
								className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold uppercase'
							/>
							<textarea
								name='name'
								placeholder='ИМЯ'
								value={badgeData.name}
								onChange={handleInputChange}
								rows={2}
								className='w-full px-4 py-2 border border-slate-200 rounded-xl font-black uppercase text-sm'
							/>
							<textarea
								name='country'
								placeholder='Должность'
								value={badgeData.country}
								onChange={handleInputChange}
								rows={2}
								className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs'
							/>
							<div className='grid grid-cols-2 gap-2'>
								<input
									name='squareCode'
									value={badgeData.squareCode}
									onChange={handleInputChange}
									className='w-full px-4 py-2 border border-slate-200 rounded-xl font-black text-center'
								/>
								<input
									name='committee'
									value={badgeData.committee}
									onChange={handleInputChange}
									className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs'
								/>
							</div>
						</div>
					</section>

					<section className='bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Размеры шрифта
						</h3>
						{['eventTitle', 'name', 'country'].map(key => (
							<div key={key}>
								<div className='flex justify-between mb-1'>
									<span className='text-[9px] font-black text-slate-400 uppercase'>
										{key}
									</span>
									<span className='text-[9px] font-black text-slate-900'>
										{badgeData.fontSizes[key as keyof FontSizes]}px
									</span>
								</div>
								<input
									type='range'
									min='8'
									max='80'
									value={badgeData.fontSizes[key as keyof FontSizes]}
									onChange={e =>
										handleFontSizeChange(
											key as keyof FontSizes,
											parseInt(e.target.value),
										)
									}
									className='w-full accent-slate-900'
								/>
							</div>
						))}
					</section>
				</div>
			</aside>

			<main className='flex-1 flex flex-col items-center justify-center p-6 bg-slate-200 min-h-screen'>
				<div className='flex flex-col items-center gap-8 scale-110'>
					<div id='main-badge-preview' className='shadow-2xl'>
						<BadgePreview data={badgeData} />
					</div>
					<button
						onClick={handleExportPNG}
						disabled={exporting}
						className='px-16 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all disabled:opacity-50'
					>
						{exporting ? 'Сохранение...' : 'Скачать PNG'}
					</button>
				</div>
			</main>
		</div>
	)
}

const ColorInput = ({ label, name, value, onChange }: any) => (
	<div>
		<label className='text-[9px] font-bold text-slate-500 uppercase block mb-1'>
			{label}
		</label>
		<input
			type='color'
			name={name}
			value={value}
			onChange={onChange}
			className='w-full h-10 rounded-lg cursor-pointer border border-slate-200 overflow-hidden'
		/>
	</div>
)

export default App
