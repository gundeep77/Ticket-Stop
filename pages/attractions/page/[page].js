import Layout from "@/components/components/MyLayout";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import noImage from "../../../img/download.jpeg";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Error from "@/components/components/404";
import { useEffect, useState } from "react";
import SearchAttractions from "@/components/components/SearchAttractions";

export default function attractions({ attractions, totalPages }) {
  const router = useRouter();
  const page = parseInt(router.query.page || "1");
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [searchedAttractions, setSearchedAttractions] = useState(undefined);
  const [isError, setIsError] = useState(null);

  const searchValue = (value) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    async function getSearchedAttractions(searchQuery) {
      try {
        const { data } = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/attractions?apikey=7ShMgZO4XCXJNbGkkI47LMDD9GDGXrpG&countryCode=US&keyword=" +
            searchQuery
        );
        if (data._embedded) {
          setSearchedAttractions(data._embedded.attractions);
        }
      } catch (error) {
        setIsError(true);
      }
    }
    getSearchedAttractions(searchQuery);
  }, [searchQuery]);

  if (searchQuery) {
    return (
      <Layout>
        <br />
        <span className="heading">Attractions</span>
        <br />
        <br />
        <SearchAttractions searchValue={searchValue} />
        <br />
        <br />
        <Grid container className="grid" spacing={5}>
          {searchedAttractions &&
            searchedAttractions.map((attraction) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={attraction.id}
              >
                <Card className="card" variant="outlined">
                  <CardActionArea>
                    <Link href={`/attractions/${attraction.id}`}>
                      <Image
                        className="media"
                        component="img"
                        src={attraction.images ? getImage(attraction) : noImage}
                        alt="attraction image"
                        width={345}
                        height={200}
                      />

                      <CardContent>
                        <Typography
                          className="titleHead"
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {attraction.name ? (
                            <p>{attraction.name}</p>
                          ) : (
                            <span></span>
                          )}
                        </Typography>
                        <Typography variant="body1" component={"div"}>
                          {attraction.classifications &&
                          attraction.classifications[0] &&
                          attraction.classifications[0].segment.name &&
                          attraction.classifications[0].genre &&
                          attraction.classifications[0].subGenre ? (
                            <p className="link">
                              {attraction.classifications[0].segment.name +
                                " | " +
                                attraction.classifications[0].genre.name +
                                " | " +
                                attraction.classifications[0].subGenre.name}
                            </p>
                          ) : (
                            <span></span>
                          )}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Layout>
    );
  }
  if (page > 0 && page < 51 && Array.isArray(attractions)) {
    return (
      <Layout>
        <br />
        <span className="heading">Attractions</span>
        <br />
        <br />
        <SearchAttractions searchValue={searchValue} />
        <br />
        <br />
        <div className="parent">
          {prevPage ? (
            <Link href={`/attractions/page/${prevPage}`}>
              <div className="child">
                <button className="tickets">Prev</button>
              </div>
            </Link>
          ) : (
            <div className="child">
              <button className="tickets" disabled>
                Prev
              </button>
            </div>
          )}
          {page && (
            <div className="child">
              <span className="caption">{page}</span>
            </div>
          )}
          {nextPage ? (
            <Link href={`/attractions/page/${nextPage}`}>
              <div className="child">
                <button className="tickets">Next</button>
              </div>
            </Link>
          ) : (
            <div className="child">
              <button className="tickets" disabled>
                Next
              </button>
            </div>
          )}
        </div>
        <br />
        <br />
        <Grid container className="grid" spacing={5}>
          {attractions &&
            attractions.map((attraction) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={attraction.id}
              >
                <Card className="card" variant="outlined">
                  <CardActionArea>
                    <Link href={`/attractions/${attraction.id}`}>
                      <Image
                        className="media"
                        component="img"
                        src={attraction.images ? getImage(attraction) : noImage}
                        alt="attraction image"
                        width={345}
                        height={200}
                      />

                      <CardContent>
                        <Typography
                          className="titleHead"
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {attraction.name ? (
                            <p>{attraction.name}</p>
                          ) : (
                            <span></span>
                          )}
                        </Typography>
                        <Typography variant="body1" component={"div"}>
                          {attraction.classifications &&
                          attraction.classifications[0] &&
                          attraction.classifications[0].segment.name &&
                          attraction.classifications[0].genre &&
                          attraction.classifications[0].subGenre ? (
                            <p className="link">
                              {attraction.classifications[0].segment.name +
                                " | " +
                                attraction.classifications[0].genre.name +
                                " | " +
                                attraction.classifications[0].subGenre.name}
                            </p>
                          ) : (
                            <span></span>
                          )}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Layout>
    );
  }
  if (isError) {
    const url = `/attractions/page/1`;
    return (
      <Layout>
        <Error url={url} code={attractions.code} msg={attractions.msg}></Error>
      </Layout>
    );
  }
}

function getImage(attraction) {
  let url = "";
  attraction.images &&
    attraction.images.forEach((image) => {
      if ((image.width === 1024) & (image.height === 576)) {
        url = image.url;
      }
    });
  return url;
}

async function getAttractionsData(page) {
  try {
    const { data } = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/attractions?apikey=7ShMgZO4XCXJNbGkkI47LMDD9GDGXrpG&countryCode=US&page=" +
        (parseInt(page) - 1)
    );
    if (data._embedded) {
      return data._embedded.attractions;
    }
  } catch (error) {
    return { code: error.response.status, msg: error.response.statusText };
  }
}

export async function getServerSideProps({ params }) {
  const page = parseInt(Number(params.page));
  const attractions = await getAttractionsData(page);
  const totalPages = 50;
  return {
    props: {
      attractions,
      totalPages,
    },
  };
}
