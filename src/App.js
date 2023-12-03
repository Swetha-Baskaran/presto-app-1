import "./App.css";
import {useState} from "react";
import MCQ from "./QnTypes/MCQ";
import Description from "./QnTypes/Description";

function App() {
	const questions = [
		{
			question: "What is the capital of Japan?",
			type: "mcq",
			options: [
				{option: "Tokyo", iscorrect: true},
				{option: "Seoul", iscorrect: false},
				{option: "Beijing", iscorrect: false},
				{option: "Bangkok", iscorrect: false},
				{option: "Hanoi", iscorrect: false},
			],
		},
		{
			question: "What is the capital of Japan?",
			type: "description",
			maxLength: 10,
		},
		{
			question: "Which planet is known as the 'Red Planet'?",
			type: "mcq",
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
			type: "mcq",
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
			type: "mcq",
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
			type: "mcq",
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
			description: "",
		}))
	);

	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);

	const handleDescriptionQns = (description, maxLength) => {
		console.log("test", description);
		if (description.length <= maxLength) {
			const tempcurrentSelectedOption = [...currentSelectedOption];
			tempcurrentSelectedOption[currentQuestion] = {
				...currentSelectedOption,
				description: description,
				score: 1,
			};

			setCurrentSelectedOption([...tempcurrentSelectedOption]);
		}
	};

	const handleSelectOption = (option, selectedOptionNumber) => {
		const tempcurrentSelectedOption = [...currentSelectedOption];
		if (option.iscorrect === true) {
			tempcurrentSelectedOption[currentQuestion] = {
				optionNumber: selectedOptionNumber,
				score: 1,
			};
		} else {
			tempcurrentSelectedOption[currentQuestion] = {
				optionNumber: selectedOptionNumber,
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
				description: "",
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
						<h2>
							{score} out of {questions.length}
						</h2>
						{
							// showing the list of qn ans
							questions.map((item, index) => {
								return (
									<div className='py-4'>
										<div>{item?.question}</div>
										<div>
											{item.type === "mcq" &&
												item?.options[
													currentSelectedOption[index].optionNumber
												]?.option}
											{item.type === "description" &&
												currentSelectedOption[index].description}
										</div>
									</div>
								);
							})
						}
						<button onClick={restart} className='bg-blue-700 px-4 py-2 text-white'>
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
												question {index ? index + 1 : 1} out of
												{questions.length}
											</h2>
											<h2 className='p-4'>
												question: {question.question}
											</h2>
											{question.type === "description" && (
												<Description
													value={
														currentSelectedOption[currentQuestion]
															.description
													}
													handleChange={handleDescriptionQns}
													intputType='text'
													maxLength={
														questions[currentQuestion].maxLength
													}
												/>
											)}
											{question.type === "mcq" && (
												<MCQ
													optionList={question.options}
													checkSelectedOption={
														currentSelectedOption[currentQuestion]
															.optionNumber
													}
													handleSelectOption={handleSelectOption}
												/>
											)}
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
								{currentQuestion === questions.length - 1
									? "Submit"
									: "Next"}
							</button>
						</div>
					</>
				)}
			</>
		</div>
	);
}

export default App;
