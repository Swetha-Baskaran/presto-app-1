import logo from "./logo.svg";
import "./App.css";
import {useState} from "react";

function App() {
	const questions = [
		{
			question: "What is the capital of Japan?",
			options: [
				{option: "Tokyo", iscorrect: true},
				{option: "Seoul", iscorrect: false},
				{option: "Beijing", iscorrect: false},
				{option: "Bangkok", iscorrect: false},
				{option: "Hanoi", iscorrect: false},
			],
		},
		{
			question: "Which planet is known as the 'Red Planet'?",
			options: [
				{option: "Mars", iscorrect: true},
				{option: "Jupiter", iscorrect: false},
				{option: "Venus", iscorrect: false},
				{option: "Saturn", iscorrect: false},
				{option: "Neptune", iscorrect: false},
			],
		},
		{
			question: "Who wrote 'To Kill a Mockingbird'?",
			options: [
				{option: "Harper Lee", iscorrect: true},
				{option: "F. Scott Fitzgerald", iscorrect: false},
				{option: "Jane Austen", iscorrect: false},
				{option: "J.K. Rowling", iscorrect: false},
				{option: "George Orwell", iscorrect: false},
			],
		},
		{
			question: "What is the largest ocean on Earth?",
			options: [
				{option: "Pacific Ocean", iscorrect: true},
				{option: "Atlantic Ocean", iscorrect: false},
				{option: "Indian Ocean", iscorrect: false},
				{option: "Southern Ocean", iscorrect: false},
				{option: "Arctic Ocean", iscorrect: false},
			],
		},
		{
			question:
				"Which programming language is used for building mobile applications?",
			options: [
				{option: "Swift", iscorrect: false},
				{option: "Java", iscorrect: false},
				{option: "Kotlin", iscorrect: false},
				{option: "React Native", iscorrect: true},
				{option: "C#", iscorrect: false},
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentSelectedOption, setCurrentSelectedOption] = useState(
		Array.from({length: questions.length}, () => ({
			optionNumber: null,
			score: null,
		}))
	);

	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);

	const handleSelectOption = (option, index) => {
		const tempcurrentSelectedOption = [...currentSelectedOption];
		if (option.iscorrect === true) {
			tempcurrentSelectedOption[currentQuestion] = {
				optionNumber: index,
				score: 1,
			};
		} else {
			tempcurrentSelectedOption[currentQuestion] = {
				optionNumber: index,
				score: 0,
			};
		}
		setCurrentSelectedOption([...tempcurrentSelectedOption]);
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			calculateScore();
			setShowScore(!showScore);
		}
	};

	const calculateScore = () => {
		let tempscore = 0;
		currentSelectedOption.map(option => {
			tempscore += option.score;
		});
		setScore(tempscore);
	};

	const handlePrev = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const restart = () => {
		setCurrentQuestion(0);
		setCurrentSelectedOption(
			Array.from({length: questions.length}, () => ({
				optionNumber: null,
				score: null,
			}))
		);
		setScore(0);
		setShowScore(false);
	};

	return (
		<div className='p-9 text-left shadow-lg m-12'>
			<>
				{showScore ? (
					<>
						<h2>{score} out of 5</h2>
						<button onClick={restart} className='bg-blue-700 m-4'>
							Restart
						</button>
					</>
				) : (
					<>
						{questions.map((question, index) => {
							return (
								<>
									{currentQuestion === index && (
										<>
											<h2 className='p-4'>
												question {index + 1} out of{" "}
												{questions.length}
											</h2>
											<h2 className='p-4'>
												question: {question.question}
											</h2>
											<div className='flex flex-col text-left items-start justify-start py-4'>
												{question.options.map((option, index) => {
													return (
														<OptionComponent
															currentSelectedOption={
																currentSelectedOption
															}
															currentQuestion={currentQuestion}
															handleSelectOption={
																handleSelectOption
															}
															value={option}
															index={index}
														/>
													);
												})}
											</div>
										</>
									)}
								</>
							);
						})}
						<div className='flex justify-between'>
							<button
								onClick={handlePrev}
								className='bg-blue-700 m-4 p-4 text-white'
							>
								Prev
							</button>
							<button
								onClick={handleNext}
								className='bg-blue-700 m-4 p-4 text-white'
							>
								Next{" "}
							</button>
						</div>
					</>
				)}
			</>
		</div>
	);
}

const OptionComponent = ({
	handleSelectOption,
	currentSelectedOption,
	currentQuestion,
	value,
	index,
}) => {
	return (
		<button
			className={`mx-4 my-2 px-4  ${
				currentSelectedOption[currentQuestion].optionNumber === index
					? "bg-green-900 text-white"
					: ""
			}`}
			value={value}
			onClick={() => {
				handleSelectOption(value, index);
			}}
		>
			{value.option}
		</button>
	);
};

export default App;
