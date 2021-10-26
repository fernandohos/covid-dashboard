import * as C from './styles';
import {CountriesContext} from '../../context/CountriesContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {useRouteMatch, useHistory} from 'react-router-dom';

type RouteMatchType = {
    page: string;
}

export function Pagination() {
    const {pagesCount} = useContext(CountriesContext);
    const {page} = useRouteMatch<RouteMatchType>().params;
    const history = useHistory();

    function scrollTop() {
        window.scrollTo(0, 0);
    }

    function changePage(n: number) {

        const nextPage = n > pagesCount
        ?
        pagesCount 
        : 
        n < 1 ? 1 : n;
        
        history.push(`/page/${nextPage}`);
        scrollTop();
    }

    return (
        <C.Container>
            <C.ButtonChangePage onClick={() => changePage(Number(page) - 1)}>
                <div className="border">
                    &lt;
                </div>
            </C.ButtonChangePage>

            <C.PagesContainer pageCount={pagesCount}>
                <div className="wrapper">
                    <div className="scroll">
                        {
                            Array(pagesCount).fill('hi').map((n, i) => {
                                return (
                                    <C.PageLink currentPage={Number(page)} onClick={() => scrollTop()} key={i}>
                                        <Link to={`/page/${i + 1}`}>{`${i + 1}`}</Link>
                                    </C.PageLink>
                                );
                            })
                        }
                    </div>
                </div>
            </C.PagesContainer>
            

            <C.ButtonChangePage onClick={() => changePage(Number(page) + 1)}>
                <div className="border">
                    &gt;
                </div>
            </C.ButtonChangePage>
        </C.Container>
    )
}