import { Container, Typography } from '@mui/material';

import { SearchUsers } from '@/components/search';

function Search() {
    return (
        <Container>
            <Typography variant="h1" gutterBottom>
                Search Users
            </Typography>

            <SearchUsers />
        </Container>
    );
}

export default Search;
