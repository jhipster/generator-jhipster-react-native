import { configure } from 'enzyme'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Mock your external modules here if needed
jest
  .mock('@react-native-community/async-storage', () => mockAsyncStorage)
  // related to https://github.com/rt2zz/redux-persist/issues/1243
  .mock("redux-persist/lib/createPersistoid", () =>
    jest.fn(() => ({
        update: jest.fn(),
        flush: jest.fn(),
    }))
  )
  .mock('@storybook/react-native', () => {
    return { getStorybookUI: jest.fn(), configure: jest.fn() }
  })
