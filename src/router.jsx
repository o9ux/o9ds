import { createHashRouter } from 'react-router-dom';
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
import MotionPage from './pages/foundations/MotionPage';
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
import TooltipPage from './pages/components/containers/TooltipPage';
import PopoverPage from './pages/components/containers/PopoverPage';
import DialogWindowPage from './pages/components/containers/DialogWindowPage';
import SidepanelPage from './pages/components/containers/SidepanelPage';
import ListItemPage from './pages/components/containers/ListItemPage';
import PulseFeedPage from './pages/components/containers/PulseFeedPage';
// Components — Status & System Feedback
import PillPage from './pages/components/feedback/PillPage';
import ProgressPage from './pages/components/feedback/ProgressPage';
import InlineAlertPage from './pages/components/feedback/InlineAlertPage';
import ToastPage from './pages/components/feedback/ToastPage';
import CounterPage from './pages/components/feedback/CounterPage';
import BadgeAlertPage from './pages/components/feedback/BadgeAlertPage';
import IndicatorPage from './pages/components/feedback/IndicatorPage';
import SplitterPage from './pages/components/feedback/SplitterPage';
// Components — Input & Form Controls
import TextboxPage from './pages/components/inputs/TextboxPage';
import CheckboxRadioPage from './pages/components/inputs/CheckboxRadioPage';
import CheckboxPage from './pages/components/inputs/CheckboxPage';
import RadioPage from './pages/components/inputs/RadioPage';
import SwitchPage from './pages/components/inputs/SwitchPage';
import LabelPage from './pages/components/inputs/LabelPage';
import SearchPage from './pages/components/inputs/SearchPage';
import TextareaPage from './pages/components/inputs/TextareaPage';
import SliderPage from './pages/components/inputs/SliderPage';
import NumberInputPage from './pages/components/inputs/NumberInputPage';
import ChipPage from './pages/components/inputs/ChipPage';
import ChipListPage from './pages/components/inputs/ChipListPage';
import SelectDropdownPage from './pages/components/inputs/SelectDropdownPage';
import MultiSelectChipInputPage from './pages/components/inputs/MultiSelectChipInputPage';
import ColorPickerPage from './pages/components/inputs/ColorPickerPage';
import DatePickerPage from './pages/components/inputs/DatePickerPage';
import TimePickerPage from './pages/components/inputs/TimePickerPage';
import DateTimePickerPage from './pages/components/inputs/DateTimePickerPage';
import DateRangePickerPage from './pages/components/inputs/DateRangePickerPage';
import FileInputPage from './pages/components/inputs/FileInputPage';
import UploadPage from './pages/components/inputs/UploadPage';
import TextEditorPage from './pages/components/inputs/TextEditorPage';
import UrlInputPage from './pages/components/inputs/UrlInputPage';

export const router = createHashRouter([
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
      { path: 'foundations/motion',       element: <MotionPage /> },
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
      { path: 'components/tooltip',        element: <TooltipPage /> },
      { path: 'components/popover',        element: <PopoverPage /> },
      { path: 'components/dialog-window',  element: <DialogWindowPage /> },
      { path: 'components/sidepanel',     element: <SidepanelPage /> },
      { path: 'components/list-item',       element: <ListItemPage /> },
      { path: 'components/pulse-feed',     element: <PulseFeedPage /> },
      // Status & System Feedback
      { path: 'components/pill',           element: <PillPage /> },
      { path: 'components/progress',      element: <ProgressPage /> },
      { path: 'components/inline-alert',   element: <InlineAlertPage /> },
      { path: 'components/toast',          element: <ToastPage /> },
      { path: 'components/counter',        element: <CounterPage /> },
      { path: 'components/badge-alert',   element: <BadgeAlertPage /> },
      { path: 'components/indicators',     element: <IndicatorPage /> },
      { path: 'components/splitter',       element: <SplitterPage /> },
      // Input & Form Controls
      { path: 'components/textbox',          element: <TextboxPage /> },
      { path: 'components/checkbox',         element: <CheckboxPage /> },
      { path: 'components/radio',                  element: <RadioPage /> },
      { path: 'components/switch',                element: <SwitchPage /> },
      { path: 'components/checkbox-radio-switch', element: <CheckboxRadioPage /> },
      { path: 'components/label',            element: <LabelPage /> },
      { path: 'components/search',           element: <SearchPage /> },
      { path: 'components/textarea',         element: <TextareaPage /> },
      { path: 'components/slider',           element: <SliderPage /> },
      { path: 'components/number-input',     element: <NumberInputPage /> },
      { path: 'components/chip',             element: <ChipPage /> },
      { path: 'components/chip-list',        element: <ChipListPage /> },
      { path: 'components/select-dropdown',  element: <SelectDropdownPage /> },
      { path: 'components/multi-select-chip-input', element: <MultiSelectChipInputPage /> },
      { path: 'components/color-picker',    element: <ColorPickerPage /> },
      { path: 'components/date-picker',     element: <DatePickerPage /> },
      { path: 'components/time-picker',     element: <TimePickerPage /> },
      { path: 'components/date-time-picker', element: <DateTimePickerPage /> },
      { path: 'components/date-range-picker', element: <DateRangePickerPage /> },
      { path: 'components/file-input',      element: <FileInputPage /> },
      { path: 'components/upload',          element: <UploadPage /> },
      { path: 'components/text-editor',     element: <TextEditorPage /> },
      { path: 'components/url-input',       element: <UrlInputPage /> },
    ],
  },
]);
