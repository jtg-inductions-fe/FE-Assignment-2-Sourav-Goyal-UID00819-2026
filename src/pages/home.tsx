import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { Input } from '@/components/input';

function Home() {
    return (
        <div>
            <Button sx={{ display: 'block', margin: '20px' }}>Click</Button>
            <Input placeholder="Hey" label="Test" />
            <Container>
                <h2>Hero Section</h2>
                <p>Content goes here...</p>
            </Container>
            <Container sx={{ bgcolor: 'grey.100' }}>
                <h2>Features Section</h2>
                <p>More content here...</p>
            </Container>
        </div>
    );
}

export default Home;
