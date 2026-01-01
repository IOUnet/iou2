const styles = (theme) => ({
  statsRow: {
    marginBottom: theme.spacing(3),
  },
  statCard: {
    height: '100%',
  },
  section: {
    marginTop: theme.spacing(3),
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  keywordsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  keywordChip: {
    textTransform: 'none',
  },
  muted: {
    color: theme.palette.text.secondary,
  },
  inlineStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
})

export default styles

