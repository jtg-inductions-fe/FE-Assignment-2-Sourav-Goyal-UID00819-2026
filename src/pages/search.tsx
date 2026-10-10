import { Container, Typography } from '@mui/material';

import { SearchUsers } from '@/components/search/search-users';

function Search() {
    return (
        <Container>
            <Typography variant="h1" gutterBottom>
                Search Page
            </Typography>

            <SearchUsers />
        </Container>
    );
}

export default Search;
