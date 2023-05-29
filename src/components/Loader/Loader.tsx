import classes from './Loader.module.scss';

interface Props {
    height?: number;
}

const Loader = ({ height }: Props) => {
    return (
        <div
            className={classes.animatedLoadingDotsContainer}
            style={{ height }}
        >
            <div className={classes.animatedLoadingDots}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
