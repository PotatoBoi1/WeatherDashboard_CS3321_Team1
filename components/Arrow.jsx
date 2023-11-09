/**
 * 
 * @param {string} orientation, defaults to right, can also pass in left if arrow should point left
 * @returns 
 */
const Arrow = ({
    orientation
}) => {
    if (orientation == "left") {
        orientation = '180deg';
    }


    return (
        <div>

        </div>
    );
}

export default Arrow;