const Buttonx = ({ text, onClickFunction, className }) => {
    return (
        <button onClick={onClickFunction} className={className}>{text}</button>
    )
}
export default Buttonx;