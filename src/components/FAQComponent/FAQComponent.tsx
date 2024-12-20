import { useState } from "react";

interface FAQProps {
	question: string;
	answer: string;
}

const FAQComponent: React.FC<FAQProps> = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleFAQ = (): void => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex items-center justify-center bg-yellow-50 w-7/12">
			<div className={`border w-full cursor-pointer`}>
				<div
					className={`font-semibold text-xl flex items-center justify-between min-w-full cursor-pointer transition-all duration-250 h-full w-full p-4 `}
					onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
						!isOpen &&
						e.currentTarget.classList.add("bg-[#FF9800]", "px-2")
					}
					onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
						!isOpen &&
						e.currentTarget.classList.remove("bg-[#FF9800]", "px-2")
					}
					onClick={toggleFAQ}>
					<span>{question}</span>
					<span className="font-bold">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M15.9167 12.0833L27.4167 12.0833L27.4167 15.9167L15.9167 15.9167L15.9167 27.4167L12.0834 27.4167L12.0834 15.9167L0.583353 15.9167L0.583353 12.0833L12.0834 12.0833L12.0834 0.583323L15.9167 0.583323L15.9167 12.0833Z"
								fill="black"
							/>
						</svg>
					</span>
				</div>
				{isOpen && (
					<div className="mt-2 text-lg px-4 py-2">{answer}</div>
				)}
			</div>
		</div>
	);
};

export default FAQComponent;
