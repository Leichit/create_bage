import React, { useState, useRef } from 'react'
import { BadgeData, BadgeRole, FontSizes } from './types'
import BadgePreview from './components/BadgePreview'
import { getBadgeDesignIdeas } from './services/geminiService'
import { toPng } from 'html-to-image'

const AVAILABLE_FONTS = [
	'Montserrat',
	'Inter',
	'Playfair Display',
	'Oswald',
	'Bebas Neue',
	'Lora',
]

const App: React.FC = () => {
	const [badgeData, setBadgeData] = useState<BadgeData>({
		name: 'KOROLENYA\nARTUR',
		country: 'Director of it\nand Technologies',
		committee: 'CCPCJ2',
		role: BadgeRole.SECRETARIAT,
		roleLabel: 'OFFICIAL DELEGATE',
		squareCode: 'IT',
		eventTitle: 'MIS MUN',
		eventSubtitle: 'INTERNATIONAL CONFERENCE',
		year: '2026',
		primaryColor: '#0d121c',
		accentColor: '#fbbf24',
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

	const handleLogoChange = (index: number, value: string) => {
		const newLogos = [...badgeData.logos]
		newLogos[index] = value
		setBadgeData(prev => ({ ...prev, logos: newLogos }))
	}

	const handleFileUpload = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => handleLogoChange(index, reader.result as string)
			reader.readAsDataURL(file)
		}
	}

	const handleFontSizeChange = (key: keyof FontSizes, value: number) => {
		setBadgeData(prev => ({
			...prev,
			fontSizes: { ...prev.fontSizes, [key]: value },
		}))
	}

	const handleExportPNG = async () => {
		const element = document.getElementById('badge-hidden-export')
		if (!element) return

		setExporting(true)
		try {
			// 1. Ждем шрифты
			await document.fonts.ready

			// 2. Даем чуть больше времени на отрисовку скрытого элемента
			await new Promise(resolve => setTimeout(resolve, 250))

			// 3. Рендерим с pixelRatio 2 (очень четко, но безопасно)
			const dataUrl = await toPng(element, {
				quality: 0.95,
				pixelRatio: 2,
				cacheBust: true,
				style: {
					transform: 'none',
					margin: '0',
					padding: '0',
					borderRadius: '0',
				},
			})

			const link = document.createElement('a')
			link.href = dataUrl
			link.download = `mun_badge_${badgeData.name.split('\n')[0].toLowerCase()}.png`
			link.click()
		} catch (error) {
			console.error('Export error:', error)
			alert(
				'Ошибка при сохранении. Попробуйте обновить страницу или использовать другой браузер.',
			)
		} finally {
			setExporting(false)
		}
	}

	return (
		<div className='min-h-screen flex flex-col lg:flex-row bg-[#f1f5f9]'>
			{/* Скрытый контейнер для чистого экспорта */}
			<div
				style={{ position: 'fixed', left: '-5000px', top: '0', zIndex: -100 }}
			>
				<div id='badge-hidden-export'>
					<BadgePreview data={badgeData} isExportMode={true} />
				</div>
			</div>

			<aside className='lg:w-[420px] w-full bg-white border-r border-slate-200 p-8 flex flex-col gap-6 h-screen overflow-y-auto sticky top-0 shadow-2xl z-30'>
				<div className='flex items-center gap-3 mb-2'>
					<div className='w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl'>
						M
					</div>
					<h1 className='text-lg font-black tracking-tighter text-slate-900 uppercase'>
						MUN Badges
					</h1>
				</div>

				<div className='space-y-6'>
					<section className='bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Conference
						</h3>
						<input
							name='eventTitle'
							value={badgeData.eventTitle}
							onChange={handleInputChange}
							className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold uppercase'
						/>
						<select
							name='titleFont'
							value={badgeData.titleFont}
							onChange={handleInputChange}
							className='w-full px-4 py-2 border border-slate-200 rounded-xl bg-white font-bold'
						>
							{AVAILABLE_FONTS.map(f => (
								<option key={f} value={f}>
									{f}
								</option>
							))}
						</select>
					</section>

					<section className='bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Participant
						</h3>
						<div className='space-y-3'>
							<select
								name='role'
								value={badgeData.role}
								onChange={handleInputChange}
								className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold'
							>
								{Object.values(BadgeRole).map(role => (
									<option key={role} value={role}>
										{role}
									</option>
								))}
							</select>
							<textarea
								name='name'
								value={badgeData.name}
								onChange={handleInputChange}
								rows={2}
								className='w-full px-4 py-2 border border-slate-200 rounded-xl font-black uppercase resize-none'
							/>
							<textarea
								name='country'
								value={badgeData.country}
								onChange={handleInputChange}
								rows={2}
								className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold resize-none text-sm'
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
									className='w-full px-4 py-2 border border-slate-200 rounded-xl font-bold'
								/>
							</div>
						</div>
					</section>

					<section className='bg-slate-50 p-5 rounded-3xl space-y-3 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Logos
						</h3>
						{[0, 1, 2].map(i => (
							<button
								key={i}
								onClick={() => fileInputRefs[i].current?.click()}
								className='w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 truncate'
							>
								{badgeData.logos[i]
									? `Logo ${i + 1} Set`
									: `Upload Logo ${i + 1}`}
								<input
									type='file'
									ref={fileInputRefs[i]}
									onChange={e => handleFileUpload(i, e)}
									className='hidden'
									accept='image/*'
								/>
							</button>
						))}
					</section>

					<section className='bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100'>
						<h3 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
							Typography Control
						</h3>
						{['eventTitle', 'name', 'country', 'footerRole'].map(key => (
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
									max='70'
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
				<div className='flex flex-col items-center gap-10'>
					<div className='bg-white p-12 rounded-[60px] shadow-2xl border border-white relative scale-[0.85] lg:scale-100 transition-transform'>
						<div className='absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 px-4 py-1 rounded-full z-50'>
							<span className='text-[9px] font-black text-white uppercase tracking-widest'>
								Master Preview
							</span>
						</div>
						<BadgePreview data={badgeData} />
					</div>

					<button
						onClick={handleExportPNG}
						disabled={exporting}
						className='px-20 py-6 bg-slate-900 text-white rounded-[32px] font-black shadow-2xl hover:bg-slate-800 active:scale-95 disabled:opacity-50 uppercase tracking-[0.25em] transition-all text-xs'
					>
						{exporting ? 'Rendering...' : 'Download Badge (PNG)'}
					</button>
				</div>
			</main>
		</div>
	)
}

export default App
