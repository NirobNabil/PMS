import Layout from '@/layout'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import './static/css/App.css'


const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </>
  )
}

export default App
