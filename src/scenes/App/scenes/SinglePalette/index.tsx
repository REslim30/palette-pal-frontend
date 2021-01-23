import React, { useState } from "react";
import hexToHsl from 'hex-to-hsl';

// Material UI imports
import { hexToRgb } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ApolloClient, { useQuery } from '@apollo/client';
import  ArrowBackIcon  from "@material-ui/icons/ArrowBack";
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import ListItem  from '@material-ui/core/ListItem';
import List  from '@material-ui/core/List';
import Snackbar from "@material-ui/core/Snackbar";
import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import GET_SINGLE_PALETTE from "./services/getSinglePaletteGraphQL";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SinglePalette(props: {id: number}) {
  const { loading, error, data } = useQuery(GET_SINGLE_PALETTE, {variables: {id: props.id}});
  const onArrowBack = () => {
    window.history.back();
  }

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={onArrowBack}>
          <ArrowBackIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>{data?.palette.name}</h1>
        <RightEdgeIconButton edge="end" color="inherit" aria-label="Add Palette">
          <MoreVertIcon />
        </RightEdgeIconButton>
      </Toolbar>
    </AppBar>

    <ColorList palette={data?.palette} loading={loading} error={error}/>
  </>
};

type ColorListProps = { 
  palette: Palette | undefined, 
  loading: boolean, 
  error: ApolloClient.ApolloError | undefined,
}

function ColorList(props: ColorListProps) {
  // Dialog state
  const [selectedColor, setSelectedColor] = useState('');
  const [successCopySnackbarOpen, setSuccessCopySnackbarOpen] = useState(false);

  if (props.loading) return <CircularProgress/>;
  if (props.error) return <p>Hello World...</p>;

  //Dialog Handlers
  const makeHandleOpen = (shade: string) => {
    return () => {
      setSelectedColor(shade);
    }
  }

  const handleClose = () => {
    setSelectedColor('');
  }

  const handleCopy = (event: React.SyntheticEvent) => {
    // Creates a span that's off the page to copy
    const colorSpan = document.createElement('span');
    colorSpan.textContent = event.currentTarget.querySelector('.js-color-text')?.textContent || '';
    colorSpan.className = 'absolute -left-96';
    document.body.appendChild(colorSpan);

    // Selects and copies
    const selection: Selection | null = window.getSelection();
    const range: Range = document.createRange();

    range.selectNodeContents(colorSpan);
    selection?.removeAllRanges();
    selection?.addRange(range);

    try {
      document.execCommand('copy');
      selection?.removeAllRanges();

      setSuccessCopySnackbarOpen(true);
    } catch (e) {
      console.error('Could not copy to clipboard ' + e)
    }

    // Clean up dom
    colorSpan.remove();

    // Close dialog
    setSelectedColor('');
  }

  const handleSuccessCopySnackbarClose = () => {
    setSuccessCopySnackbarOpen(false);
  }

  // Calculate hsl and rgb css strings
  let hslSelectedColor;
  let rgbSelectedColor;
  if (selectedColor) {
    const hslArray = hexToHsl(selectedColor);
    hslSelectedColor = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;
    rgbSelectedColor = hexToRgb(selectedColor);
  }

  return <main className="p-6">
    {props.palette?.colors.map(color => {
        return <section className="mb-10" key={color.id}>
          <h2 className="text-3xl mb-2">{color.name}</h2>
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
            {/* List of shades */}
            {color.shades.map((shade, index) => {
                return <button className="flex flex-col items-center rounded-lg border-2 border-gray-300 pt-2 pb-1 px-2" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }} key={index} aria-label={shade} onClick={makeHandleOpen(shade)}>
                    <span className="inline-block h-12 w-12 rounded-lg mb-1.5" style={{ backgroundColor: shade }}/>
                    <p className="text-neutral-600 font-mono">{shade.toUpperCase()}</p>
                  </button>
              })
            }
          </div>
        </section>
      })
    }
    {/* Dialog box for copying color to clipboard */}
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={Boolean(selectedColor)}>
      <DialogTitle id='dialog-title' disableTypography={true}>
        <span className="h-4 w-4 mr-2 rounded-full inline-block" style={{ backgroundColor: selectedColor}}/>
        Copy color to clipboard
      </DialogTitle>
      
      <List>
        {[selectedColor?.toUpperCase(), rgbSelectedColor, hslSelectedColor].map(color => {
          return <ListItem button onClick={handleCopy}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy text-neutral-500 mr-2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>

            <span className="js-color-text font-mono">{color}</span>
          </ListItem>
        })}
      </List>
    </Dialog>

    {/* Copy success/error Snackbars */}
    <Snackbar 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={successCopySnackbarOpen} 
      autoHideDuration={6000} 
      onClose={handleSuccessCopySnackbarClose} 
      message="Copied!"/>
  </main>
}