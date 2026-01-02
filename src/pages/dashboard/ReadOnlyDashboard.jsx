import { Box, Chip, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { useMemo, useState } from 'react'

import Button from '../../components/button/Button'
import PageLayout from '../../components/page-layout/PageLayout'
import PageTitle from '../../components/page-title/PageTitle'
import TokenCardsList from '../../components/token-cards-list/TokenCardsList'
import ValueInfo from '../../components/value-info/ValueInfo'
import { useGetDashboardTotals } from '../../hooks/useGetDashboardTotals'
import { useGetKeywordsList } from '../../hooks/useGetKeywordsList'
import { useGetIOUsByKeyword } from '../../hooks/useGetIOUsByKeyword'
import styles from './styles'

const ReadOnlyDashboard = ({ classes }) => {
  const [search, setSearch] = useState('')
  const [selectedKeyword, setSelectedKeyword] = useState('')

  const { ious, issuers, isLoading: isLoadingTotals, error: totalsError } = useGetDashboardTotals()
  const {
    keywords,
    isLoading: isLoadingKeywords,
    error: keywordsError,
  } = useGetKeywordsList()

  const {
    data: iousByKeyword,
    isLoading: isLoadingIOUs,
    error: iousError,
  } = useGetIOUsByKeyword(selectedKeyword)

  const filteredKeywords = useMemo(() => {
    if (!keywords?.length) return []
    if (!search) return keywords
    const term = search.toLowerCase()
    return keywords.filter((k) => k.toLowerCase().includes(term))
  }, [keywords, search])

  const renderKeywordChips = () => {
    if (isLoadingKeywords) {
      return (
        <Box className={classes.inlineStatus}>
          <CircularProgress size={18} />
          <Typography component="span">Loading keywords…</Typography>
        </Box>
      )
    }

    if (keywordsError) {
      return <Typography color="error">{keywordsError}</Typography>
    }

    if (!filteredKeywords.length) {
      return <Typography className={classes.muted}>No keywords found</Typography>
    }

    return (
      <Box className={classes.keywordsList}>
        {filteredKeywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            color={keyword === selectedKeyword ? 'primary' : 'default'}
            onClick={() => setSelectedKeyword(keyword)}
            className={classes.keywordChip}
          />
        ))}
      </Box>
    )
  }

  const renderIOUsSection = () => {
    if (!selectedKeyword) {
      return <Typography className={classes.muted}>Select a keyword to view its IOUs.</Typography>
    }

    if (isLoadingIOUs) {
      return (
        <Box className={classes.inlineStatus}>
          <CircularProgress size={18} />
          <Typography component="span">Loading IOUs…</Typography>
        </Box>
      )
    }

    if (iousError) {
      return <Typography color="error">{iousError}</Typography>
    }

    if (!iousByKeyword?.length) {
      return <Typography className={classes.muted}>No IOUs found for this keyword yet.</Typography>
    }

    return (
      <TokenCardsList
        title={`IOUs tagged with “${selectedKeyword}”`}
        data={iousByKeyword}
        onClick={() => {}}
      />
    )
  }

  return (
    <PageLayout>
      <PageTitle>IOU dashboard (read-only)</PageTitle>

      <Grid container spacing={3} className={classes.statsRow}>
        <Grid item xs={12} md={6}>
          <ValueInfo
            label="IOUs total"
            value={isLoadingTotals ? 'Loading…' : ious}
            className={classes.statCard}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValueInfo
            label="Issuers total"
            value={isLoadingTotals ? 'Loading…' : issuers}
            className={classes.statCard}
          />
        </Grid>
      </Grid>

      {totalsError && <Typography color="error">{totalsError}</Typography>}

      <Box className={classes.section}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6">Keywords</Typography>
          <Box className={classes.searchBox}>
            <TextField
              size="small"
              placeholder="Search keywords"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={() => setSearch('')}>
              Clear
            </Button>
          </Box>
        </Box>
        {renderKeywordChips()}
      </Box>

      <Box className={classes.section}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6">IOUs</Typography>
        </Box>
        {renderIOUsSection()}
      </Box>
    </PageLayout>
  )
}

export default withStyles(styles, { withTheme: true })(ReadOnlyDashboard)
