import { verifyCredentials } from '../../core/utils/credentials';

type Props = {};

export const HaidresserHomePage = (props: Props) => {
    verifyCredentials();
    return <div>HairdresserHomePage</div>;
};
