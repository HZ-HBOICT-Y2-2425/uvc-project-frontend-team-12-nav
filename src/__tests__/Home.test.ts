import { render, screen, fireEvent } from '@testing-library/svelte';
import Home from '/src/routes/home/page.svelte';
import { user } from '$lib/stores/userStore';
import { vi } from 'vitest';

// Mock user store
const mockUser = {
  total: 350,
};
vi.mock('$lib/stores/userStore', () => ({
  user: { subscribe: vi.fn((fn) => fn(mockUser)) },
}));

// Mock $app/navigation
vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));

describe('Home Page', () => {
  it('renders the header and water tank correctly', async () => {
    render(Home);

    // Check that the header is rendered
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check that the WaterTank component is receiving props correctly
    expect(screen.getByText('Total Water Usage: 350L')).toBeInTheDocument();
  });

  it('navigates to waterlog when the water tank button is clicked', async () => {
    const { getByRole } = render(Home);
    const waterLogButton = getByRole('button', { name: /go to water log/i });

    await fireEvent.click(waterLogButton);

    // Assert that the navigation function is called
    const { goto } = await import('$app/navigation');
    expect(goto).toHaveBeenCalledWith('/waterlog');
  });

  it('renders navigation buttons and handles navigation', async () => {
    render(Home);

    // Check navigation buttons are rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();

    // Simulate a click on the "Profile" button
    const profileButton = screen.getByText('Profile');
    await fireEvent.click(profileButton);

    // Assert that the navigation function is called
    const { goto } = await import('$app/navigation');
    expect(goto).toHaveBeenCalledWith('/profile');
  });
});
