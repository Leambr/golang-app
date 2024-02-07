import { verifyCredentials } from '../../core/utils/credentials';


type Props = {};

export const CustomerHomePage = (props: Props) => {
    verifyCredentials();
    return <div>CustomerHomePage</div>;
};
