import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MetaDecorator = ({ title, description, author }) => {
    return(
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content={author}></meta>
        </Helmet>
    )
};

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string
};

export default MetaDecorator;