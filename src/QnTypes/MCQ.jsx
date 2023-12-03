import React from "react";

const MCQ = ({optionList, checkSelectedOption, handleSelectOption}) => {
	return (
		<div className='flex flex-col text-left items-start justify-start py-4'>
			{optionList.map((option, index) => {
				return (
					<OptionComponent
						checkSelectedOption={checkSelectedOption}
						handleSelectOption={handleSelectOption}
						value={option} // option + iscorrect
						index={index}
					/>
				);
			})}
		</div>
	);
};

const OptionComponent = ({
	checkSelectedOption,
	handleSelectOption,
	value,
	index,
}) => {
	return (
		<button
			className={`mx-4 my-2 px-4  ${
				checkSelectedOption === index ? "bg-green-900" : ""
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

export default MCQ;
