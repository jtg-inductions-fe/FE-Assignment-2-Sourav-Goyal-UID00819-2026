import { useEffect, useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

type SearchInputProps = {
    handleSearch: (textQuery: string) => void;
    query?: string;
};

export const SearchInput = ({ handleSearch, query = '' }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState(query);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputValue && inputValue.trim()) {
            handleSearch(inputValue.trim());
        }
    };

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
                gap: 2,
            }}
        >
            <TextField
                name="search"
                fullWidth
                variant="outlined"
                placeholder="Search Github users..."
                size="small"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{ height: '40px', width: { xs: '100%', md: 'initial' } }}
            >
                Search
            </Button>
        </Box>
    );
};
