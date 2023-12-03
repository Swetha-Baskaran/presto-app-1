import React from "react";

const Description = ({value, handleChange, maxLength, intputType}) => {
	return (
		<div>
			<input
				className='shadow-xl border-2 border-black'
				style={{border: "1px solid black"}}
				type={intputType}
				id=''
				value={value}
				onChange={e => {
					handleChange(e.target.value, maxLength);
				}}
			/>
			<div>
				{value?.length}/{" "}{maxLength}
			</div>
		</div>
	);
};

export default Description;
