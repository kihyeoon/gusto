import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// https://tanstack.com/query/latest/docs/framework/react/guides/testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = async (component: React.ReactNode) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>,
    ),
  };
};

export default renderWithProviders;
