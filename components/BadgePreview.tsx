import React from 'react'
import { BadgeData } from '../types'

interface BadgePreviewProps {
	data: BadgeData
	isExportMode?: boolean
}

const BadgePreview: React.FC<BadgePreviewProps> = ({
	data,
	isExportMode = false,
}) => {
	const { fontSizes, logos } = data

	const getFontClass = (font: string) => {
		switch (font) {
			case 'Playfair Display':
				return 'font-playfair'
			case 'Oswald':
				return 'font-oswald'
			case 'Montserrat':
				return 'font-montserrat'
			case 'Bebas Neue':
				return 'font-bebas'
			case 'Lora':
				return 'font-lora'
			default:
				return 'font-inter'
		}
	}

	const palette = {
		main: '#0d121c',
		accent: '#fbbf24',
		secondary: '#1a2436',
		overlay: 'rgba(255, 255, 255, 0.05)',
	}

	return (
		<div
			style={{
				width: '320px',
				height: '480px',
				backgroundColor: palette.main,
				borderRadius: isExportMode ? '0px' : '45px',
				position: 'relative',
				overflow: 'hidden',
				color: 'white',
				boxSizing: 'border-box',
				margin: '0',
				padding: '0',
				display: 'block',
			}}
		>
			{/* 1. Декоративный фон */}
			<div
				style={{
					position: 'absolute',
					top: '220px',
					left: '-100px',
					width: '600px',
					height: '400px',
					backgroundColor: palette.secondary,
					transform: 'rotate(-20deg)',
					zIndex: 1,
				}}
			></div>

			{/* 2. Логотипы */}
			<div
				style={{
					position: 'absolute',
					top: '32px',
					left: '0',
					width: '320px',
					display: 'flex',
					justifyContent: 'center',
					gap: '8px',
					zIndex: 50,
				}}
			>
				{logos.map((logo, index) => (
					<div
						key={index}
						style={{
							width: '40px',
							height: '40px',
							backgroundColor: palette.overlay,
							border: '1px solid rgba(255,255,255,0.1)',
							borderRadius: '10px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '5px',
							overflow: 'hidden',
						}}
					>
						{logo ? (
							<img
								src={logo}
								alt=''
								style={{
									maxWidth: '100%',
									maxHeight: '100%',
									objectFit: 'contain',
								}}
							/>
						) : (
							<div
								style={{
									width: '6px',
									height: '6px',
									borderRadius: '50%',
									backgroundColor: 'rgba(255,255,255,0.1)',
								}}
							></div>
						)}
					</div>
				))}
			</div>

			{/* 3. Шапка мероприятия */}
			<div
				style={{
					position: 'absolute',
					top: '100px',
					left: '32px',
					right: '32px',
					zIndex: 10,
				}}
			>
				<div
					className={getFontClass(data.titleFont)}
					style={{
						color: palette.accent,
						fontSize: `${fontSizes.eventTitle}px`,
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '-0.05em',
						lineHeight: '1.1',
					}}
				>
					{data.eventTitle}
				</div>
				<div
					style={{
						fontSize: `${fontSizes.eventSubtitle}px`,
						fontWeight: 700,
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						opacity: 0.4,
						marginTop: '4px',
						lineHeight: '1.2',
					}}
				>
					{data.eventSubtitle} • {data.year}
				</div>
			</div>

			{/* 4. Метка роли */}
			<div
				style={{
					position: 'absolute',
					top: '195px',
					left: '32px',
					backgroundColor: 'rgba(30, 41, 59, 0.98)',
					padding: '5px 12px',
					borderRadius: '8px',
					border: '1px solid rgba(255,255,255,0.05)',
					zIndex: 20,
				}}
			>
				<span
					style={{
						color: palette.accent,
						fontSize: `${fontSizes.roleLabel}px`,
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						display: 'block',
						lineHeight: '1',
					}}
				>
					{data.roleLabel}
				</span>
			</div>

			{/* 5. Имя участника */}
			<div
				style={{
					position: 'absolute',
					top: '235px',
					left: '32px',
					right: '32px',
					zIndex: 30,
					height: '110px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
				}}
			>
				<div
					style={{
						fontSize: `${fontSizes.name}px`,
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '-0.04em',
						lineHeight: '0.95',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
						margin: 0,
					}}
				>
					{data.name}
				</div>
			</div>

			{/* 6. Подробности */}
			<div
				style={{
					position: 'absolute',
					top: '330px',
					left: '32px',
					right: '32px',
					display: 'flex',
					alignItems: 'flex-start',
					gap: '12px',
					zIndex: 30,
				}}
			>
				<div
					style={{
						width: '52px',
						height: '44px',
						backgroundColor: 'white',
						color: '#0d121c',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontWeight: 900,
						fontSize: `${fontSizes.squareCode}px`,
						flexShrink: 0,
					}}
				>
					{data.squareCode}
				</div>
				<div style={{ minWidth: 0, paddingTop: '2px' }}>
					<div
						style={{
							fontSize: `${fontSizes.country}px`,
							fontWeight: 700,
							lineHeight: '1.2',
							whiteSpace: 'pre-wrap',
							margin: 0,
						}}
					>
						{data.country}
					</div>
					<div
						style={{
							fontSize: `${fontSizes.committee}px`,
							fontWeight: 700,
							textTransform: 'uppercase',
							letterSpacing: '0.1em',
							opacity: 0.3,
							marginTop: '4px',
							lineHeight: '1',
						}}
					>
						{data.committee}
					</div>
				</div>
			</div>

			{/* 7. Нижняя кнопка-роль */}
			<div
				style={{
					position: 'absolute',
					bottom: '20px',
					left: '32px',
					right: '32px',
					height: '56px',
					backgroundColor: palette.accent,
					color: palette.main,
					borderRadius: '28px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 40,
					boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
				}}
			>
				<div
					style={{
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '0.2em',
						fontSize: `${fontSizes.footerRole}px`,
						lineHeight: '1',
					}}
				>
					{data.role}
				</div>
			</div>
		</div>
	)
}

export default BadgePreview
