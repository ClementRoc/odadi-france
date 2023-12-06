<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\NewsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NewsController extends AbstractController
{

    /**
     * @Route("/actualités", name="app_news", methods="GET")
     */
    public function news(NewsService $newsService): Response
    {
        return $this->render('news.html.twig', [
            'actualities' => $newsService->getActualities()
        ]);
    }

    /**
     * @Route("/actualités/{slug}", name="app_actuality", methods="GET")
     */
    public function actuality(string $slug, NewsService $newsService): Response
    {
        return $this->render('news/actuality.html.twig', [
            'actuality' => $newsService->getActualityDTO($slug),
            'hotnews' => $newsService->getHotnews(2)
        ]);
    }
}