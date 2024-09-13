import ReactLoading from 'react-loading';
import classnames from 'classnames/bind';
import styles from './Loading.module.scss'
const cx = classnames.bind(styles)

const Loading = () => {
    return (
        <>
            <div className={cx('loading_contain')} >
                <div className={cx('loading')}>
                    <ReactLoading type={'spinningBubbles'} height={50} width={50} />
                </div>
            </div>
        </>
    );
};

export default Loading;
