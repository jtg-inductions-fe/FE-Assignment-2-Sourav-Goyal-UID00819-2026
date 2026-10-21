import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import * as S from './SearchInput.styles';
import type { SearchInputProps } from './SearchInput.types';

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
        <S.SearchForm onSubmit={onSubmit}>
            <TextField
                name="search"
                fullWidth
                variant="outlined"
                placeholder="Search Github users..."
                size="small"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <S.SearchButton type="submit" variant="contained" disableElevation>
                Search
            </S.SearchButton>
        </S.SearchForm>
    );
};
