import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import { Card, CardContent, Grid, Link } from "@material-ui/core";
import supabase from "../lib/supabase-client";
import { Word } from "../types";
import { Link as RouterLink } from "react-router-dom";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import TranslateIcon from '@material-ui/icons/Translate';
export interface HomeCardProps {
  title: string;
  content: any;
  link: string;
  linkText: string;
}
const HomeCard: React.FunctionComponent<HomeCardProps> = ({
  title,
  content,
  link,
  linkText,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="text-xl font-bold text-center mb-5">{title}</div>
        <div className="text-5xl text-gray-500 text-center mb-5">{content}</div>
        <div className="text-center">
          <Link component={RouterLink} to={link}>
            {linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
const Home = () => {
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    const fetchWordCount = async () => {
      const { count } = await supabase
        .from<Word>("words")
        .select("*", { count: "exact" })
        .range(0, 0);
      setTotalWords(Number(count));
    };
    fetchWordCount();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <HomeCard
            title="Total Words"
            content={totalWords}
            link="/words"
            linkText="Learn words"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <HomeCard
            title="Flash Card"
            content={<CropOriginalIcon className="text-5xl" />}
            link="/tests/flash-cards"
            linkText="Take test"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <HomeCard
            title="Choose word"
            content={<AssignmentTurnedInIcon className="text-5xl" />}
            link="/tests/choose-word"
            linkText="Take rest"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <HomeCard
            title="Writing test"
            content={<BorderColorIcon className="text-5xl" />}
            link="/tests/writing"
            linkText="Take rest"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <HomeCard
            title="Other Langugae"
            content={<TranslateIcon className="text-5xl" />}
            link="/tests/other-language"
            linkText="Take rest"
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
