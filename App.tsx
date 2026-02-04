import React from 'react'
import { FullDesignData } from '../App'

interface BadgePreviewProps {
	data: FullDesignData
}

const BadgePreview: React.FC<BadgePreviewProps> = ({ data }) => {
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

	return (
		<div
			style={{
				width: '320px',
				height: '480px',
				backgroundColor: data.primaryColor,
				position: 'relative',
				overflow: 'hidden',
				boxSizing: 'border-box',
				display: 'block',
			}}
		>
			{/* Декор */}
			<div
				style={{
					position: 'absolute',
					top: '15px',
					left: '-100px',
					width: '600px',
					height: '400px',
					backgroundColor: data.decorationColor,
					opacity: data.decorationOpacity,
					transform: 'rotate(-20deg)',
					zIndex: 1,
				}}
			></div>

			{/* Конференция */}
			<div
				style={{
					position: 'absolute',
					top: '70px',
					left: '32px',
					right: '32px',
					zIndex: 10,
				}}
			>
				<div
					className={getFontClass(data.titleFont)}
					style={{
						color: data.accentColor,
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
						color: data.textColorSubtitle,
						opacity: 0.6,
						fontSize: `${fontSizes.eventSubtitle}px`,
						fontWeight: 700,
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						marginTop: '4px',
					}}
				>
					{data.eventSubtitle} • {data.year}
				</div>
			</div>

			{/* Official Delegate */}
			<div
				style={{
					position: 'absolute',
					top: '220px',
					left: '32px',
					backgroundColor: data.delegateBadgeBg,
					padding: '5px 12px',
					borderRadius: '8px',
					zIndex: 20,
				}}
			>
				<span
					style={{
						color: data.accentColor,
						fontSize: `${fontSizes.roleLabel}px`,
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
					}}
				>
					{data.roleLabel}
				</span>
			</div>

			{/* ИМЯ */}
			<div
				style={{
					position: 'absolute',
					top: '240px',
					left: '32px',
					right: '32px',
					zIndex: 30,
				}}
			>
				<div
					style={{
						color: data.textColorMain,
						fontSize: `${fontSizes.name}px`,
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '-0.04em',
						lineHeight: '0.95',
						whiteSpace: 'pre-wrap',
					}}
				>
					{data.name}
				</div>
			</div>

			{/* Код и Должность */}
			<div
				style={{
					position: 'absolute',
					top: '335px',
					left: '32px',
					right: '32px',
					display: 'flex',
					gap: '12px',
					zIndex: 30,
					alignItems: 'center',
				}}
			>
				<div
					style={{
						width: '52px',
						height: '44px',
						backgroundColor: data.squareColor,
						color: data.textColorSquare,
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontWeight: 900,
						fontSize: `${fontSizes.squareCode}px`,
					}}
				>
					{data.squareCode}
				</div>
				<div>
					<div
						style={{
							color: data.textColorMain,
							fontSize: `${fontSizes.country}px`,
							fontWeight: 700,
							lineHeight: '1.2',
							whiteSpace: 'pre-wrap',
						}}
					>
						{data.country}
					</div>
					<div
						style={{
							color: data.textColorCommittee,
							opacity: 0.5,
							fontSize: `${fontSizes.committee}px`,
							fontWeight: 700,
							textTransform: 'uppercase',
							letterSpacing: '0.1em',
							marginTop: '2px',
						}}
					>
						{data.committee}
					</div>
				</div>
			</div>

			{/* Кнопка Роли */}
			<div
				style={{
					position: 'absolute',
					bottom: '20px',
					left: '32px',
					right: '32px',
					height: '56px',
					backgroundColor: data.accentColor,
					color: data.textColorFooter,
					borderRadius: '28px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 40,
				}}
			>
				<div
					style={{
						fontWeight: 900,
						textTransform: 'uppercase',
						letterSpacing: '0.2em',
						fontSize: `${fontSizes.footerRole}px`,
					}}
				>
					{data.role}
				</div>
			</div>
		</div>
	)
}

export default BadgePreview
