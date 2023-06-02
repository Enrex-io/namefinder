import Loader from './Loader';

const FullscreenLoader = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Loader height={21} />
        </div>
    );
};

export default FullscreenLoader;
