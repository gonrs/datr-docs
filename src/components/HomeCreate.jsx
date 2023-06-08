function HomeCreate({ setIsAdd }) {
	return (
		<div className='homeCreateDiv'>
			<button onClick={() => setIsAdd(true)} className='homeCreateBtn'>
				+
			</button>
		</div>
	)
}
export default HomeCreate
