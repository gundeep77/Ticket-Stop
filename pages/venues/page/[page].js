import Layout from "@/components/components/MyLayout";
import axios from "axios";
import Link from "next/link";
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
import Image from "next/image";

export default function attractions({ venues, totalPages }) {
  const router = useRouter();
  const page = parseInt(router.query.page || "1");

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  let url = `/venues/page/1`;
  if (page > 0 && page < 51 && Array.isArray(venues)) {
    return (
      <Layout>
        <br />
        <span className="heading">Venues</span>
        <br />
        <br />
        <div className="parent">
          {prevPage ? (
            <Link href={`/venues/page/${prevPage}`}>
              <div className="child">
                <button className="tickets">Prev</button>
              </div>
            </Link>
          ) : (
            <div className="child">
              <button disabled>Prev</button>
            </div>
          )}
          {page && (
            <div className="child">
              <span className="caption">{page}</span>
            </div>
          )}
          {nextPage ? (
            <Link href={`/venues/page/${nextPage}`}>
              <div className="child">
                <button className="tickets">Next</button>
              </div>
            </Link>
          ) : (
            <div className="child">
              <button disabled>Next</button>
            </div>
          )}
        </div>
        <br />
        <br />
        <Grid container className="grid" spacing={5}>
          {venues &&
            venues.map((venue) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={venue.id}>
                <Card className="card" variant="outlined">
                  <CardActionArea>
                    <Link href={`/venues/${venue.id}`}>
                      <Image
                        className="venueMedia"
                        component="img"
                        src={
                          venue.images && venue.images[0].url
                            ? venue.images[0].url
                            : noImage
                        }
                        alt="venue image"
                        width={345}
                        height={200}
                      />

                      <CardContent>
                        <Typography
                          className="titleHead"
                          variant="h5"
                          component="h2"
                        >
                          {venue.name}
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
  } else {
    return (
      <Layout>
        <Error url={url} code={venues.code} msg={venues.msg}></Error>
      </Layout>
    );
  }
}

async function getVenueData(page) {
  try {
    const { data } = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/venues?apikey=7ShMgZO4XCXJNbGkkI47LMDD9GDGXrpG&countryCode=US&page=" +
        (parseInt(page) - 1)
    );
    if (data._embedded) {
      return data._embedded.venues;
    }
  } catch (error) {
    return { code: error.response.status, msg: error.response.statusText };
  }
}

export async function getServerSideProps({ params }) {
  const page = parseInt(Number(params.page));
  const venues = await getVenueData(page);
  const totalPages = 50;
  return {
    props: {
      venues,
      totalPages,
    },
  };
}
