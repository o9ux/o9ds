import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import SelectDropdown from '@/components/inputs/SelectDropdown';
import NumberInput from '@/components/inputs/NumberInput';
import ColorPicker from '@/components/inputs/ColorPicker';
import DropdownButton from '@/components/buttons/DropdownButton';
import DropdownList from '@/components/containers/DropdownList';
import O9Icon from '@/components/O9Icon';

/* ── Formatting icons ── */
import boldSvg from '@/assets/icons/o9con-bold.svg?raw';
import italicSvg from '@/assets/icons/o9con-italic.svg?raw';
import underlineSvg from '@/assets/icons/o9con-underline.svg?raw';
import strikethroughSvg from '@/assets/icons/o9con-strikethrough.svg?raw';

/* ── Alignment icons ── */
import alignLeftSvg from '@/assets/icons/o9con-align-left.svg?raw';
import alignCenterSvg from '@/assets/icons/o9con-align-center.svg?raw';
import alignRightSvg from '@/assets/icons/o9con-align-right.svg?raw';
import alignJustifySvg from '@/assets/icons/o9con-align-justify.svg?raw';

/* ── Overflow menu icons ── */
import listUlSvg from '@/assets/icons/o9con-list-ul.svg?raw';
import listOlSvg from '@/assets/icons/o9con-list-ol.svg?raw';
import indentSvg from '@/assets/icons/o9con-indent.svg?raw';
import delistSvg from '@/assets/icons/o9con-delist.svg?raw';
import linkSvg from '@/assets/icons/o9con-link.svg?raw';
import unlinkSvg from '@/assets/icons/o9con-unlink.svg?raw';
import quoteLeftSvg from '@/assets/icons/o9con-quote-left.svg?raw';
import codeSvg from '@/assets/icons/o9con-code.svg?raw';
import ellipsisVSvg from '@/assets/icons/o9con-ellipsis-v.svg?raw';

/* ── Status icon ── */
import blockerSvg from '@/assets/icons/o9con-blocker-action-filled-alt.svg?raw';

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const focusBorderColors = {
  default: 'var(--color-interactive-border)',
  error:   'var(--color-danger)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
};

const statusBorder = {
  default: 'border-border-hover hover:border-border-strong',
  error:   'border-danger',
  success: 'border-success/60 hover:border-success',
  warning: 'border-warning/60 hover:border-warning',
};

const statusText = {
  default: 'text-text-tertiary',
  error:   'text-danger',
  success: 'text-success',
  warning: 'text-warning',
};

/* Toolbar child sizes: keep compact for sm/md, scale up for lg */
const toolbarChildSize = { sm: 'sm', md: 'sm', lg: 'md' };

/* Toolbar button dimensions */
const tbBtnSize = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
};
const tbIconSize = {
  sm: '[&_svg]:w-3.5 [&_svg]:h-3.5',
  md: '[&_svg]:w-4 [&_svg]:h-4',
};

/* Content area sizing — mirrors Textarea */
const contentSizeStyles = {
  sm: 'px-2 py-1.5 text-xs',
  md: 'px-3 py-2 text-xs',
  lg: 'px-3 py-2.5 text-sm',
};

/* Toolbar padding per size */
const toolbarPad = {
  sm: 'px-1.5 py-1',
  md: 'px-2 py-1.5',
  lg: 'px-2.5 py-2',
};

/* Separator height */
const separatorH = { sm: 'h-4', md: 'h-5', lg: 'h-6' };

/* Default font families — o9Sans (brand) first, Google Fonts, then system fonts */
const DEFAULT_FONTS = [
  { value: 'o9Sans', label: 'o9Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Merriweather', label: 'Merriweather' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Oswald', label: 'Oswald' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'PT Sans', label: 'PT Sans' },
  { value: 'Raleway', label: 'Raleway' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Source Sans 3', label: 'Source Sans 3' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
];

/* Alignment icon map */
const alignmentIcons = {
  left: alignLeftSvg,
  center: alignCenterSvg,
  right: alignRightSvg,
  justify: alignJustifySvg,
  start: alignLeftSvg,
};

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

/** Compact toolbar icon button with toggle state */
const ToolbarButton = ({ icon, title, onClick, active, disabled, size = 'sm' }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'flex items-center justify-center rounded transition-colors cursor-pointer',
      tbBtnSize[size],
      tbIconSize[size],
      active
        ? 'bg-interactive text-on-interactive'
        : 'text-text-secondary hover:bg-surface-overlay hover:text-text',
      disabled && 'opacity-35 pointer-events-none'
    )}
  >
    <O9Icon svg={icon} />
  </button>
);

/** Subtle vertical separator between toolbar groups */
const Separator = ({ size = 'md' }) => (
  <span className={cn('w-px bg-border mx-1 shrink-0', separatorH[size])} aria-hidden="true" />
);

/* ─────────────────────────────────────────────
   TextEditor
   ───────────────────────────────────────────── */

const TextEditor = forwardRef(function TextEditor(
  {
    size = 'md',
    status = 'default',
    label,
    required = false,
    optional = false,
    helperText,
    errorText,
    value = '',
    onChange,
    placeholder = 'Start typing...',
    disabled = false,
    readOnly = false,
    minHeight = 200,
    fontFamilies,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `te-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const savedRangeRef = useRef(null);

  /* ── Focus tracking (Textarea pattern) ── */
  const [focused, setFocused] = useState(false);

  /* ── Toolbar state ── */
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [currentFont, setCurrentFont] = useState('o9Sans');
  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('');
  const [alignment, setAlignment] = useState('left');

  const childSize = toolbarChildSize[size];
  const fonts = fontFamilies || DEFAULT_FONTS;

  /* ── Ref merge ── */
  const setEditorRef = useCallback(
    (node) => {
      editorRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  /* ── Selection preservation ──
     Always track the latest selection inside the editor
     so toolbar controls can restore it before executing commands. */
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (
        sel &&
        sel.rangeCount > 0 &&
        editorRef.current &&
        editorRef.current.contains(sel.anchorNode)
      ) {
        savedRangeRef.current = sel.getRangeAt(0).cloneRange();

        /* Update toolbar state from current selection */
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
        setIsStrikethrough(document.queryCommandState('strikethrough'));

        const fontName = document.queryCommandValue('fontName').replace(/"/g, '');
        if (fontName) setCurrentFont(fontName);

        const node =
          sel.anchorNode?.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
        if (node && editorRef.current.contains(node)) {
          const computed = window.getComputedStyle(node);
          setFontSize(parseInt(computed.fontSize, 10) || 14);

          const ta = computed.textAlign || 'left';
          setAlignment(ta === 'start' ? 'left' : ta);
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  /* ── Restore selection & execute command ── */
  const restoreSelection = useCallback(() => {
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  }, []);

  const execCommand = useCallback(
    (command, val = null) => {
      restoreSelection();
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      if (onChange) {
        onChange(editorRef.current?.innerHTML || '');
      }
    },
    [onChange, restoreSelection]
  );

  /* ── Content input handler ── */
  const handleInput = useCallback(() => {
    if (onChange) {
      onChange(editorRef.current?.innerHTML || '');
    }
  }, [onChange]);

  /* ── Focus handlers ── */
  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(
    (e) => {
      /* Stay "focused" if focus moves within the same editor container */
      const container = editorRef.current?.closest('[data-text-editor]');
      if (container && container.contains(e.relatedTarget)) return;
      setFocused(false);
    },
    []
  );

  /* ── Toolbar: prevent blur when clicking toolbar (save selection) ── */
  const handleToolbarMouseDown = useCallback((e) => {
    /* Prevent focus theft from contentEditable for simple button clicks.
       Don't prevent for inputs/selects inside toolbar (they need focus). */
    const tag = e.target.tagName;
    if (tag !== 'INPUT' && tag !== 'SELECT' && tag !== 'TEXTAREA') {
      e.preventDefault();
    }
  }, []);

  /* ── Font family change ── */
  const handleFontFamily = useCallback(
    (val) => {
      setCurrentFont(val);
      execCommand('fontName', val);
    },
    [execCommand]
  );

  /* ── Font size change ──
     execCommand('fontSize') only supports 1-7. Workaround: use size 7 as
     a marker, then replace <font size="7"> with <span style="font-size:…"> */
  const lastSizeApplied = useRef({ px: 0, ts: 0 });
  const handleFontSize = useCallback(
    (e) => {
      const px = typeof e === 'number' ? e : Number(e?.target?.value ?? e);
      if (!px || isNaN(px) || px < 8 || px > 120) return;

      /* Debounce: skip if same size was applied within 100ms (avoids double-fire from NumberInput) */
      const now = Date.now();
      if (px === lastSizeApplied.current.px && now - lastSizeApplied.current.ts < 100) return;
      lastSizeApplied.current = { px, ts: now };

      setFontSize(px);

      restoreSelection();
      editorRef.current?.focus();

      /* Verify we have a valid selection inside the editor before applying */
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || !editorRef.current?.contains(sel.anchorNode)) return;

      document.execCommand('fontSize', false, '7');

      /* Replace the marker <font size="7"> elements with properly-sized spans */
      if (editorRef.current) {
        const fonts = editorRef.current.querySelectorAll('font[size="7"]');
        fonts.forEach((el) => {
          const span = document.createElement('span');
          span.style.fontSize = `${px}px`;
          while (el.firstChild) span.appendChild(el.firstChild);
          el.replaceWith(span);
        });
      }

      if (onChange) {
        onChange(editorRef.current?.innerHTML || '');
      }
    },
    [onChange, restoreSelection]
  );

  /* ── Font color ── */
  const handleFontColor = useCallback(
    (color) => {
      setFontColor(color || '#FFFFFF');
      if (color) execCommand('foreColor', color);
    },
    [execCommand]
  );

  /* ── Background color ── */
  const handleBgColor = useCallback(
    (color) => {
      setBgColor(color);
      if (color) {
        execCommand('hiliteColor', color);
      } else {
        execCommand('hiliteColor', 'transparent');
      }
    },
    [execCommand]
  );

  /* ── Alignment ── */
  const handleAlign = useCallback(
    (cmd, align) => {
      setAlignment(align);
      execCommand(cmd);
    },
    [execCommand]
  );

  /* ── Overflow menu commands ── */
  const handleInsertLink = useCallback(() => {
    restoreSelection();
    const url = window.prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  }, [execCommand, restoreSelection]);

  /* ── Footer message ── */
  const messageText = status === 'error' ? errorText : helperText;

  return (
    <div
      data-text-editor=""
      className={cn('flex flex-col gap-1', className)}
      {...rest}
    >
      {/* Label */}
      {label && (
        <Label
          size={size}
          required={required}
          optional={optional}
          disabled={disabled}
          htmlFor={inputId}
        >
          {label}
        </Label>
      )}

      {/* Editor container — styled like Textarea (border-b, bg-surface-input, status) */}
      <div
        className={cn(
          'border-b transition-colors',
          'bg-surface-input hover:bg-surface-input-hover',
          !focused && statusBorder[status],
          disabled && 'opacity-50 pointer-events-none border-border-disabled bg-surface-input',
          readOnly && 'border-dashed border-border-strong'
        )}
        style={
          focused && !disabled
            ? { borderBottomColor: focusBorderColors[status] }
            : undefined
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* Toolbar — hidden in readOnly mode */}
        {!readOnly && (
          <div
            ref={toolbarRef}
            onMouseDown={handleToolbarMouseDown}
            className={cn(
              'flex items-center gap-1 flex-wrap border-b border-border',
              toolbarPad[size]
            )}
          >
            {/* ── Font Family ── */}
            <SelectDropdown
              options={fonts}
              value={currentFont}
              onChange={handleFontFamily}
              size={childSize}
              disabled={disabled}
              placeholder="Font"
              className="w-[130px] [&>div]:border-b-0 [&>div]:bg-transparent [&>div]:hover:bg-transparent"
            />

            {/* ── Font Size ── */}
            <NumberInput
              min={8}
              max={120}
              step={1}
              value={fontSize}
              onChange={handleFontSize}
              size={childSize}
              disabled={disabled}
              className="w-[70px] [&>div]:border-b-0 [&>div]:bg-transparent [&>div]:hover:bg-transparent"
            />

            <Separator size={size} />

            {/* ── Bold / Italic / Underline / Strikethrough ── */}
            <div className="flex items-center gap-0.5">
              <ToolbarButton
                icon={boldSvg}
                title="Bold"
                onClick={() => execCommand('bold')}
                active={isBold}
                disabled={disabled}
                size={childSize}
              />
              <ToolbarButton
                icon={italicSvg}
                title="Italic"
                onClick={() => execCommand('italic')}
                active={isItalic}
                disabled={disabled}
                size={childSize}
              />
              <ToolbarButton
                icon={underlineSvg}
                title="Underline"
                onClick={() => execCommand('underline')}
                active={isUnderline}
                disabled={disabled}
                size={childSize}
              />
              <ToolbarButton
                icon={strikethroughSvg}
                title="Strikethrough"
                onClick={() => execCommand('strikethrough')}
                active={isStrikethrough}
                disabled={disabled}
                size={childSize}
              />
            </div>

            <Separator size={size} />

            {/* ── Background Color & Font Color ── */}
            <div className="flex items-center gap-0.5">
              <ColorPicker
                variant="background"
                size={childSize}
                value={bgColor}
                onChange={handleBgColor}
                showOpacity={false}
                disabled={disabled}
              />
              <ColorPicker
                variant="font"
                size={childSize}
                value={fontColor}
                onChange={handleFontColor}
                showOpacity={false}
                disabled={disabled}
              />
            </div>

            <Separator size={size} />

            {/* ── Text Alignment ── */}
            <DropdownButton
              variant="secondary"
              size={childSize}
              leadingIcon={<O9Icon svg={alignmentIcons[alignment] || alignLeftSvg} />}
              disabled={disabled}
              menu={
                <DropdownList>
                  <DropdownList.Item
                    icon={<O9Icon svg={alignLeftSvg} />}
                    active={alignment === 'left'}
                    onClick={() => handleAlign('justifyLeft', 'left')}
                  >
                    Align Left
                  </DropdownList.Item>
                  <DropdownList.Item
                    icon={<O9Icon svg={alignCenterSvg} />}
                    active={alignment === 'center'}
                    onClick={() => handleAlign('justifyCenter', 'center')}
                  >
                    Align Center
                  </DropdownList.Item>
                  <DropdownList.Item
                    icon={<O9Icon svg={alignRightSvg} />}
                    active={alignment === 'right'}
                    onClick={() => handleAlign('justifyRight', 'right')}
                  >
                    Align Right
                  </DropdownList.Item>
                  <DropdownList.Item
                    icon={<O9Icon svg={alignJustifySvg} />}
                    active={alignment === 'justify'}
                    onClick={() => handleAlign('justifyFull', 'justify')}
                  >
                    Justify
                  </DropdownList.Item>
                </DropdownList>
              }
            />

            <Separator size={size} />

            {/* ── Overflow Menu ── */}
            <DropdownButton
              variant="secondary"
              size={childSize}
              leadingIcon={<O9Icon svg={ellipsisVSvg} />}
              disabled={disabled}
              menu={
                <DropdownList>
                  <DropdownList.Section>
                    <DropdownList.Header>Lists</DropdownList.Header>
                    <DropdownList.Item
                      icon={<O9Icon svg={listUlSvg} />}
                      onClick={() => execCommand('insertUnorderedList')}
                    >
                      Bulleted List
                    </DropdownList.Item>
                    <DropdownList.Item
                      icon={<O9Icon svg={listOlSvg} />}
                      onClick={() => execCommand('insertOrderedList')}
                    >
                      Numbered List
                    </DropdownList.Item>
                  </DropdownList.Section>
                  <DropdownList.Divider />
                  <DropdownList.Section>
                    <DropdownList.Header>Indent</DropdownList.Header>
                    <DropdownList.Item
                      icon={<O9Icon svg={indentSvg} />}
                      onClick={() => execCommand('indent')}
                    >
                      Indent
                    </DropdownList.Item>
                    <DropdownList.Item
                      icon={<O9Icon svg={delistSvg} />}
                      onClick={() => execCommand('outdent')}
                    >
                      Outdent
                    </DropdownList.Item>
                  </DropdownList.Section>
                  <DropdownList.Divider />
                  <DropdownList.Section>
                    <DropdownList.Header>Insert</DropdownList.Header>
                    <DropdownList.Item
                      icon={<O9Icon svg={linkSvg} />}
                      onClick={handleInsertLink}
                    >
                      Insert Link
                    </DropdownList.Item>
                    <DropdownList.Item
                      icon={<O9Icon svg={unlinkSvg} />}
                      onClick={() => execCommand('unlink')}
                    >
                      Remove Link
                    </DropdownList.Item>
                  </DropdownList.Section>
                  <DropdownList.Divider />
                  <DropdownList.Item
                    icon={<O9Icon svg={quoteLeftSvg} />}
                    onClick={() => execCommand('formatBlock', 'blockquote')}
                  >
                    Block Quote
                  </DropdownList.Item>
                  <DropdownList.Item
                    icon={<O9Icon svg={codeSvg} />}
                    onClick={() => {
                      restoreSelection();
                      const sel = window.getSelection();
                      if (sel.rangeCount > 0) {
                        const range = sel.getRangeAt(0);
                        const code = document.createElement('code');
                        code.className = 'bg-surface-sunken px-1 py-0.5 rounded text-xs font-mono';
                        range.surroundContents(code);
                        if (onChange) onChange(editorRef.current?.innerHTML || '');
                      }
                    }}
                  >
                    Inline Code
                  </DropdownList.Item>
                </DropdownList>
              }
            />
          </div>
        )}

        {/* Editable area — styled to match Textarea */}
        <div
          ref={setEditorRef}
          id={inputId}
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          onInput={handleInput}
          data-placeholder={placeholder}
          style={{ minHeight, fontFamily: currentFont }}
          className={cn(
            'outline-none text-text bg-transparent',
            'prose prose-invert prose-sm max-w-none',
            contentSizeStyles[size],
            '[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-text-placeholder [&:empty]:before:pointer-events-none',
            readOnly && 'cursor-default'
          )}
          dangerouslySetInnerHTML={value ? { __html: value } : undefined}
        />
      </div>

      {/* Footer message — same pattern as Textarea */}
      {messageText && (
        <p className={cn('text-xs flex items-center gap-1', statusText[status])}>
          {status === 'error' && (
            <span className="shrink-0 w-3 h-3 [&_svg]:h-3 [&_svg]:w-3 flex items-center justify-center">
              <O9Icon svg={blockerSvg} />
            </span>
          )}
          <span>{messageText}</span>
        </p>
      )}
    </div>
  );
});

export default TextEditor;
