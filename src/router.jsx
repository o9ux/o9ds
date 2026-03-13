import { createBrowserRouter } from 'react-router-dom';
import DocsLayout from './layouts/DocsLayout';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
// Foundations
import StylesPage from './pages/foundations/StylesPage';
import ColorPage from './pages/foundations/ColorPage';
import TypographyPage from './pages/foundations/TypographyPage';
import IconsPage from './pages/foundations/IconsPage';
import SpacingPage from './pages/foundations/SpacingPage';
import EffectsPage from './pages/foundations/EffectsPage';
import IllustrationsPage from './pages/foundations/IllustrationsPage';
// Components — Buttons & Actions
import ButtonPage from './pages/components/buttons/ButtonPage';
import IconButtonPage from './pages/components/buttons/IconButtonPage';
import DropdownButtonPage from './pages/components/buttons/DropdownButtonPage';
import SplitButtonPage from './pages/components/buttons/SplitButtonPage';
import ButtonGroupPage from './pages/components/buttons/ButtonGroupPage';
import FABButtonPage from './pages/components/buttons/FABButtonPage';
// Components — Navigation
import TabstripPage from './pages/components/navigation/TabstripPage';
import LinkPage from './pages/components/navigation/LinkPage';
import BreadcrumbPage from './pages/components/navigation/BreadcrumbPage';
// Components — Containers
import AvatarPage from './pages/components/containers/AvatarPage';
import AvatarGroupPage from './pages/components/containers/AvatarGroupPage';
import CardPage from './pages/components/containers/CardPage';
import TooltipPage from './pages/components/containers/TooltipPage';
import PopoverPage from './pages/components/containers/PopoverPage';
import ActionMenuPage from './pages/components/containers/ActionMenuPage';
import FeedPage from './pages/components/containers/FeedPage';
// Components — Status & System Feedback
import BadgePage from './pages/components/feedback/BadgePage';
import SpinnerPage from './pages/components/feedback/SpinnerPage';
import InlineAlertPage from './pages/components/feedback/InlineAlertPage';
import AlertDialogPage from './pages/components/feedback/AlertDialogPage';
import ToastPage from './pages/components/feedback/ToastPage';
import BannerAlertPage from './pages/components/feedback/BannerAlertPage';
import CounterPage from './pages/components/feedback/CounterPage';
import EmptyStatePage from './pages/components/feedback/EmptyStatePage';
import IndicatorPage from './pages/components/feedback/IndicatorPage';
import SplitterPage from './pages/components/feedback/SplitterPage';
// Components — Input & Form Controls
import TextboxPage from './pages/components/inputs/TextboxPage';
import CheckboxRadioPage from './pages/components/inputs/CheckboxRadioPage';
import LabelPage from './pages/components/inputs/LabelPage';
import SearchPage from './pages/components/inputs/SearchPage';
import TextareaPage from './pages/components/inputs/TextareaPage';
import SliderPage from './pages/components/inputs/SliderPage';
import NumberInputPage from './pages/components/inputs/NumberInputPage';
import ChipPage from './pages/components/inputs/ChipPage';
import SelectDropdownPage from './pages/components/inputs/SelectDropdownPage';
import MultiSelectPage from './pages/components/inputs/MultiSelectPage';
import ComboboxPage from './pages/components/inputs/ComboboxPage';
import DatePickerPage from './pages/components/inputs/DatePickerPage';
import TimePickerPage from './pages/components/inputs/TimePickerPage';
import FileInputPage from './pages/components/inputs/FileInputPage';
import UploadPage from './pages/components/inputs/UploadPage';
import TextEditorPage from './pages/components/inputs/TextEditorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/docs',
    element: <DocsLayout />,
    children: [
      { path: 'get-started', element: <GetStarted /> },
      // Foundations
      { path: 'foundations/styles',       element: <StylesPage /> },
      { path: 'foundations/color',        element: <ColorPage /> },
      { path: 'foundations/typography',   element: <TypographyPage /> },
      { path: 'foundations/spacing',      element: <SpacingPage /> },
      { path: 'foundations/effects',      element: <EffectsPage /> },
      { path: 'foundations/icons',        element: <IconsPage /> },
      { path: 'foundations/illustrations', element: <IllustrationsPage /> },
      // Buttons & Actions
      { path: 'components/button',          element: <ButtonPage /> },
      { path: 'components/icon-button',     element: <IconButtonPage /> },
      { path: 'components/dropdown-button', element: <DropdownButtonPage /> },
      { path: 'components/split-button',    element: <SplitButtonPage /> },
      { path: 'components/button-group',    element: <ButtonGroupPage /> },
      { path: 'components/fab-button',      element: <FABButtonPage /> },
      // Navigation
      { path: 'components/tabstrip',      element: <TabstripPage /> },
      { path: 'components/link',          element: <LinkPage /> },
      { path: 'components/breadcrumb',    element: <BreadcrumbPage /> },
      // Containers
      { path: 'components/avatar',         element: <AvatarPage /> },
      { path: 'components/avatar-group',   element: <AvatarGroupPage /> },
      { path: 'components/card',           element: <CardPage /> },
      { path: 'components/tooltip',        element: <TooltipPage /> },
      { path: 'components/popover',        element: <PopoverPage /> },
      { path: 'components/action-menu',    element: <ActionMenuPage /> },
      { path: 'components/feed',            element: <FeedPage /> },
      // Status & System Feedback
      { path: 'components/badge',          element: <BadgePage /> },
      { path: 'components/spinner',        element: <SpinnerPage /> },
      { path: 'components/inline-alert',   element: <InlineAlertPage /> },
      { path: 'components/alert-dialog',   element: <AlertDialogPage /> },
      { path: 'components/toast',          element: <ToastPage /> },
      { path: 'components/banner-alerts',  element: <BannerAlertPage /> },
      { path: 'components/counter',        element: <CounterPage /> },
      { path: 'components/empty-state',    element: <EmptyStatePage /> },
      { path: 'components/indicators',     element: <IndicatorPage /> },
      { path: 'components/splitter',       element: <SplitterPage /> },
      // Input & Form Controls
      { path: 'components/textbox',          element: <TextboxPage /> },
      { path: 'components/checkbox',         element: <CheckboxRadioPage /> },
      { path: 'components/label',            element: <LabelPage /> },
      { path: 'components/search',           element: <SearchPage /> },
      { path: 'components/textarea',         element: <TextareaPage /> },
      { path: 'components/slider',           element: <SliderPage /> },
      { path: 'components/number-input',     element: <NumberInputPage /> },
      { path: 'components/chip',             element: <ChipPage /> },
      { path: 'components/select-dropdown',  element: <SelectDropdownPage /> },
      { path: 'components/multi-select',    element: <MultiSelectPage /> },
      { path: 'components/combobox',        element: <ComboboxPage /> },
      { path: 'components/date-picker',     element: <DatePickerPage /> },
      { path: 'components/time-picker',     element: <TimePickerPage /> },
      { path: 'components/file-input',      element: <FileInputPage /> },
      { path: 'components/upload',          element: <UploadPage /> },
      { path: 'components/text-editor',     element: <TextEditorPage /> },
    ],
  },
]);
